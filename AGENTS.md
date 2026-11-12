# AGENTS.md: Nature 3D Site

## Project

A scroll-driven 3D website about nature loss and recovery, with a grounded
voice and text guide. Order: hero film, a 10-second animation of seven
floating logos, then six sections (loss, underground, food, rivers, recovery,
cities), then a footer with a contact form. Every factual claim shows its
source.

## Stack

Frontend: Vite, React, TypeScript (strict), Tailwind, three, @react-three/fiber, @react-three/drei, GSAP with ScrollTrigger, Lenis, Zustand.
Backend: FastAPI, SQLAlchemy 2, Alembic, Postgres with pgvector. AI: NVIDIA NIM hosted API through OpenAI-compatible chat completions interface (backend adapter). Voice: STT and TTS behind adapter interfaces. Package manager: pnpm. Tests: Vitest and pytest.

## Sources of truth

- contracts/ defines shared types. Change it only with a note in PROGRESS.md.
- content/ and docs/blueprint.md hold all user-visible copy, facts and caveats.
- design/tokens.json holds visual decisions. Any value marked TODO(DIRECTOR) is undecided.

## Working method

1. Read the task card fully. Write a short plan: goal, files you will touch, risks.
2. Work on one component per branch, named cN-short-name, in small commits.
3. Run the card's Verify checklist. Attach evidence (command output, test names, screenshots) to PROGRESS.md.
4. If blocked or a decision is missing, stop and add the question to PROGRESS.md under Questions for director. Do not guess.

## Hard rules (DO NOT)

1. DO NOT invent facts, numbers, copy or sources. Use only content/ and docs/blueprint.md. If something is missing, insert TODO(DIRECTOR) or TODO(RESEARCH).
2. DO NOT decide names, palette, fonts, 3D art style, narration or tone. Use design/tokens.json placeholders.
3. DO NOT reword caveats. Render them verbatim and visibly next to the claim they qualify.
4. DO NOT describe the 73% figure as animals dying. It is the average change in the size of monitored populations.
5. DO NOT write or imply that trees talk, send warnings or share resources through fungal networks. Say only what content/ says.
6. DO NOT put API keys or provider calls in the frontend. Keys live in environment variables; commit only .env.example.
7. DO NOT autoplay audio or request the microphone without a user click. Always show a visible indicator while the mic is live.
8. DO NOT store raw audio. DO NOT log transcripts unless LOG_TRANSCRIPTS=true.
9. DO NOT let a section specialist retrieve from other sections. Enforce the section filter on the server.
10. DO NOT add a dependency or asset without recording name, version, licence and reason in PROGRESS.md.
11. DO NOT edit another component's files, or change a contract, outside your task card.
12. DO NOT add features outside the task card.
13. DO NOT skip prefers-reduced-motion support.
14. DO NOT mark a task done without running its Verify checklist and attaching evidence.

## Definition of done

Build, typecheck, lint and tests pass. The Verify checklist is ticked with evidence. PROGRESS.md lists decisions, dependencies added and open questions.
