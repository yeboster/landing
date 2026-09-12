---
title: Meta Names
description: A naming system on Partisia Blockchain — Rust contracts, a TypeScript SDK, and a Svelte front end.
date: 2026-09-07
tags: [Rust, TypeScript, Svelte, Blockchain]
draft: false
---

Names are the part of crypto that still feels hostile. Addresses are long, opaque, and
impossible to read aloud, so people copy them from chat messages and hope. Meta Names is
a naming layer for Partisia Blockchain: register a name, point it at an address, and send
to the name instead.

## The problem

A naming system is deceptively large for what it appears to do. It is not one product, it
is three that have to agree with each other:

1. **A registry that cannot be argued with.** Ownership, resolution and transfer rules live
   on chain, where they are enforced rather than promised.
2. **An interface developers will actually use.** Applications need to resolve a name to an
   address without reading contract internals.
3. **A front end that does not assume the user is a cryptographer.** Registering a name has
   to be a form, not a transaction builder.

Each layer has a different audience — the contract is written for correctness, the SDK for
ergonomics, the interface for someone who has never seen a block explorer.

## How it works

**Contracts, in Rust.** Partisia contracts compile to WASM, which makes Rust the natural
choice: ownership rules, storage layout and the resolution path are all expressed as data
and transitions on chain, so the rules travel with the state instead of living in a server.

**An SDK in TypeScript.** Applications rarely want to talk to a contract directly. The SDK
wraps registration and lookup behind ordinary async calls, so resolving a name in a dApp is
a function call returning a string rather than an ABI-encoded round trip. TypeScript was
not a preference so much as a constraint: it is the language the surrounding ecosystem is
already written in.

**A Svelte front end.** The interface is small, fast and mostly a single flow — connect,
search, register. Svelte keeps the bundle close to the size of the problem, which matters
when the people using it are already waiting on a wallet confirmation.

## What the design buys

- **One source of truth for authority.** Because ownership is enforced on chain, no
  application can quietly disagree about who controls a name.
- **The SDK is the integration point.** Applications resolve names through the SDK rather
  than the contract's internals, which keeps the on-chain rules conservative while the
  developer experience improves independently.
- **A small surface area.** Three layers, one job each, with the boundary between them
  deliberately narrow.

## What I would change

The gap between on-chain reality and user expectation is wider than it looks from a
whiteboard. Storage is not free, transactions are not instant, and a name is not a domain —
every place where a familiar web expectation meets an immutable ledger has to be explained
in the interface, and explanations are where products lose people.

If I were starting again I would design the first-run experience before the SDK. The
contract rules were clearer to me than the user's mental model, and that order is easy to
keep once the code is written.
