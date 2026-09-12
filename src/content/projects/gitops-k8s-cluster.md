---
title: GitOps Kubernetes at Home
description: A Talos cluster that exists in Git and nowhere else — bootstrapped with Ansible, reconciled by FluxCD.
date: 2026-09-08
tags: [Kubernetes, Talos, FluxCD, Ansible, Helm]
draft: false
---

Every self-hosted setup starts the same way: one machine, a handful of services, and a
growing pile of changes nobody wrote down. Six months later the server is a snowflake and
the only documentation is shell history. I wanted the opposite — infrastructure I could
delete and rebuild from a Git repository.

## The problem

Two things had to be true at once. The cluster had to be **reproducible**: a fresh machine,
one command, and the same cluster comes back. And it had to be **declarative**: anything
running in the cluster should be described in a file, not applied by hand at the time it
was needed.

The hard part is not installing Kubernetes. It is deciding where the boundary sits between
what a bootstrap script does once and what the cluster reconciles forever after.

## How it works

The stack has two distinct halves.

**Bootstrap, once.** Ansible prepares the machines and installs Flux. This is the only
imperative step in the whole setup, and it is deliberately small — everything it can avoid
deciding, it leaves to the cluster.

**Everything else, forever.** From that point the cluster pulls its own state from Git.
FluxCD watches the repository and reconciles reality toward it: Helm for the charts that
already fit, Kustomize for the overlays that need local adjustments, and plain manifests
for the rest. Nothing is applied by hand; if a change is not committed, it does not survive
the next reconciliation.

The operating system underneath is Talos — an immutable, API-driven Kubernetes OS with no
SSH and no package manager. That choice does most of the work. There is no drift to
accumulate on a machine you cannot log into, and because nodes are configured through the
API, "rebuild the node" and "re-apply the config" are the same operation.

## What the design buys

- **A rebuild is a test.** Recreating the cluster from the repository is the acceptance
  criterion, so the setup gets exercised instead of assumed to work.
- **Reviews apply to infrastructure.** A change to what runs in production is a diff with
  history, comments, and a revert button.
- **The blast radius is visible.** Reading the repository tells you what should be running
  without querying a live cluster.

## What I would change

Talos removes the escape hatch, and that cuts both ways. There is no SSH, so a broken
machine config cannot be fixed by logging in and editing a file — recovery is through the
API and the config you already committed. It is the right trade for a system that must be
reproducible, but it means the bootstrap path deserves far more care than the day-to-day
manifests.

The other honest lesson: the boundary between bootstrap and reconciliation is where every
mistake landed. Anything Ansible does "just this once" becomes invisible to Flux, and
invisible infrastructure is exactly what this project was built to avoid.
