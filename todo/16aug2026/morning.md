# KSAI Table & Vertical — Morning Session Summary

## 1. Main Objective

Build a **frontend HTML table with CRUD functionality**, while keeping the architecture modular, reusable, and manageable.

The current direction is to eventually maintain mainly:

* **Table + CRUD**
* **Vertical**

The separate **Table Only** implementation should eventually be eliminated if Table + CRUD can completely cover its functionality through configuration/flags.

---

## 2. Important Architecture Observation

The Table and Vertical libraries currently have a very similar lifecycle:

1. Normalize configuration
2. Create data store
3. Create UI state
4. Create DOM manipulation layer
5. Configure columns
6. Setup services
7. Load data
8. Mount/render UI

This similarity is useful because it suggests a common architecture.

### Important distinction

When Vertical is used independently, it can legitimately perform its own setup and data loading.

But when Vertical is being used **inside the Table library**, the Table already has:

* configuration
* data
* data store
* services
* DOM/runtime information

Therefore, Vertical should ideally have a **render-only mode** when embedded inside Table.

Conceptually:

```text
Independent Vertical
    → setup
    → fetch/load data
    → render

Vertical inside Table
    → receive existing runtime/data
    → render only
```

Do not refactor this immediately. First understand and verify the existing behavior.

---

## 3. Single Source of Truth

A major architectural principle identified today:

> The data loaded from the endpoint should become the single source of truth.

Ideally:

```text
Endpoint
   ↓
Single fetch
   ↓
Data Store
   ↓
Table / Vertical / Filters
```

The Vertical should not unnecessarily make another server request when the Table already has the required data.

### Verification task

Run the application and inspect the browser **Network** tab.

Check:

* How many fetch calls happen?
* Is the same data fetched more than once?
* Does Vertical fetch again even though Table already has the data?

If multiple unnecessary fetches are confirmed, then refactoring the Vertical data-loading path becomes worthwhile.

---

## 4. Callback Flow — Important Discovery

We traced the callback flow through several layers.

The flow is approximately:

```text
Table / Vertical
   ↓
mountCreate
   ↓
ks-html-form-no-enter
   ↓
renderForm
   ↓
createInputRows
   ↓
createInputRow
   ↓
createDefaultInput
   ↓
ks-input-no-enter
   ↓
button click
   ↓
callback
```

Most of these layers **do not execute the callback**.

They simply transport the callback configuration downward.

The important handoff happens in:

```text
createDefaultInput.js
```

where the callback is attached to the input component:

```js
row.inCallBacks = inCallBacks;
```

Then the actual callback is consumed inside:

```text
ks-input-no-enter
```

---

## 5. Dynamic Column-Wise Filtering

The current implementation is nicely **configuration-driven**.

The input component does not know anything about specific business fields such as:

* LedgerName
* Date
* Voucher
* StockItem
* Amount

Instead, when the button beside an input is clicked, it dynamically determines:

1. The input element
2. The input's `name`
3. The value entered by the user
4. The complete data from the data store
5. The matching records

Conceptually:

```text
DOM
 ↓
input.name
 ↓
input.value
 ↓
dataStore.getData()
 ↓
filter()
 ↓
dataToShow
 ↓
callback
```

This means an arbitrary number of columns can use the same mechanism without writing column-specific code.

That is a strong part of the current design.

---

## 6. Vertical as a Filter Surface

The important UI idea discussed today:

The Vertical should not necessarily be thought of as another table.

When used above a table, it can act as a **filter/search surface**.

For example:

```text
Vertical / Filter Area
────────────────────────────
Date        [2026-04-22]  🔍
Customer    [ABC]         🔍
Voucher     [Sales]       🔍
Amount      [10000]       🔍
────────────────────────────

              ↓

          Table Results
```

The Table remains responsible for rendering the data.

The Vertical provides a convenient way for the user to narrow that data.

---

## 7. Datalist Idea

The existing datalist infrastructure can be reused.

Instead of recalculating unique values from the complete data every time, the existing datalist DOM can potentially be inspected.

For example:

```text
Data Store
    ↓
Datalist preparation
    ↓
Unique values
    ↓
Datalist DOM
```

Therefore, if we need to know how many unique values are available for a column, the already-created datalist may provide that information directly.

This avoids unnecessary duplicate processing.

---

## 8. Showing Counts in Datalist Options

A useful UX idea discussed today:

Suppose there are:

```text
5,000 rows
250 unique dates
```

Instead of simply showing:

```text
2026-04-21
2026-04-22
2026-04-23
```

the user could potentially see:

```text
2026-04-21 (18)
2026-04-22 (42)
2026-04-23 (7)
```

where the number represents how many records have that value.

The important requirement is:

```text
Displayed label → human-friendly information
Actual value     → clean searchable value
```

For example:

```text
Displayed: 2026-04-22 (42)
Value:     2026-04-22
```

This would give the user useful information before selecting a value.

It could be useful for:

* dates
* vouchers
* customers
* stock items
* amounts
* master values
* transaction values

### Caveat

Native HTML `<datalist>` rendering can vary between browsers, especially when using both `value` and `label`.

So this should be tested in the browsers that the library supports before committing to it.

---

## 9. Performance Context

A major motivation for this work is large datasets.

One example discussed:

```text
~83,000 rows
```

Rendering the complete table caused browser memory usage to reach roughly:

```text
~4 GB
```

Whereas loading the data into memory without rendering the complete table used roughly:

```text
~1 GB
```

This reinforces the principle:

> Keep the data in memory, but render only what is necessary.

The future filtering approach can therefore be:

```text
Load data once
     ↓
Store in memory
     ↓
User filters
     ↓
Filter in memory
     ↓
Render smaller result
```

This avoids unnecessary server calls and reduces DOM pressure.

---

## 10. Table Only → Table CRUD

Current plan:

### Keep temporarily

```text
Table Only
Table + CRUD
Vertical
```

### Eventually

```text
Table + CRUD
Vertical
```

The Table + CRUD implementation should become the superset.

Features such as:

* footer
* footer inputs
* totals
* CRUD actions
* body rendering

should be controlled through configuration/flags.

If:

```text
showFooter = false
showFooterInputs = false
CRUD actions = false
```

produces behavior equivalent to Table Only, then Table Only becomes unnecessary.

### Important

Do not delete Table Only yet.

First establish **feature parity**, test it, and only then remove the duplicate implementation.

---

## 11. Code Stability Principle

The current Table code is stable and tested.

Therefore:

> Do not refactor stable code simply because a cleaner architecture has been discovered.

First:

1. Understand the existing flow.
2. Verify behavior.
3. Identify duplication.
4. Make small changes.
5. Test.
6. Refactor only when the benefit is clear.

The goal is to improve the architecture **without breaking working functionality**.

---

## 12. Key Architectural Insight From Today

The most important idea discovered today is:

> **Separate execution from rendering.**

Execution includes:

* configuration
* services
* data loading
* data store
* state
* server communication

Rendering includes:

* Table
* Vertical
* Forms
* Filters
* Datalists

When Table already owns the execution context, Vertical should ideally be able to consume that context and render without repeating the execution work.

That gives a cleaner architecture:

```text
                 ┌───────────────┐
                 │   Endpoint    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │   Data Store  │
                 └───────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        ┌───────────┐        ┌────────────┐
        │  Vertical │        │   Table    │
        │  Filters  │        │  Renderer  │
        └─────┬─────┘        └─────┬──────┘
              │                    │
              └──────────┬─────────┘
                         ▼
                    User Actions
```

This is the architectural direction to keep in mind while continuing the investigation.

---

# Next Actions

### 1. Verify network calls

Run the application and check the browser Network tab.

* [ ] Confirm how many fetch calls happen.
* [ ] Confirm whether Vertical performs another fetch.
* [ ] Confirm whether the existing Table data store is already sufficient.
* [ ] Do not refactor until this is verified.

### 2. Investigate datalist preparation

Find the code that creates/populates the datalists.

* [ ] Identify where unique values are generated.
* [ ] Identify where `<option>` elements are created.
* [ ] Determine whether counts can be calculated there.
* [ ] Experiment with `value` + display `label`.

### 3. Add value counts

Prototype:

```text
2026-04-22 (42)
```

while retaining:

```text
value = "2026-04-22"
```

Test actual browser behavior.

### 4. Continue Vertical integration

Keep following the current callback flow.

The important callback path is already understood:

```text
mountCreate
 → HTML form
 → createInputRows
 → createInputRow
 → createDefaultInput
 → ks-input-no-enter
 → button click
 → filter data
 → callback
 → table body
```

### 5. Eventually eliminate Table Only

Only after Table + CRUD is proven to cover Table Only completely:

```text
Table Only
    ↓
Retire

Table + CRUD
    +
Vertical
```

---

## Final Takeaway

Today's biggest progress was not writing more code.

It was understanding the **architecture and boundaries** more clearly.

The current direction is:

> **One source of truth → reusable runtime → Vertical as filter surface → Table as renderer → configuration-driven behavior → minimal DOM rendering.**

Keep the existing stable implementation safe while gradually moving toward that model.
