# Owner notes (overrides)

Write free-form intent here. The automation must respect these.

## Intent

- Dual goal: **quant risk awareness** + **fundamental suggestion quality**.
- Prefer clarity over trade frequency. Default bias: **Hold policy** unless material.
- Brief length: **~1 page**. Do not repeat the same print across sections — the site splits Decision / Book / Tape / Names.
- Each brief should include **dual-lens position ratings** (Trim/Hold/Add/Watch/Review) for every name, a short **book-level stance**, then ≤3 ranked items that agree with Net ratings.

## Constraints

- Private repo — do not suggest publishing holdings externally.
- SPCX is an **ETF** (AXS Space Priority), not direct SpaceX equity.
- LEN / SPCX / TSLA are underwater vs cost — **average-down is allowed** only via **[Consider]** when `rules.md` **Average-down gate** passes (thesis intact + sourced valuation attractiveness + risk bands + event awareness). Down vs cost alone is not a reason to add.

## Manual updates

- Qty/cost last broker paste: **2026-08-02**. Price / MV / Weight / P&L refresh from Yahoo every run (`python3 scripts/refresh-holdings.py`). After trades, edit Qty and Cost/sh and the **Qty/cost as-of** date — do not paste a full price snapshot.
