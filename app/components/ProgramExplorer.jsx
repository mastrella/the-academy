"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { programs } from "../data/site";

const filters = ["All", "Grappling", "Striking", "Youth", "Movement"];

const programMeta = {
  "Brazilian Jiu Jitsu": {
    category: "Grappling",
    level: "Beginner to advanced",
    outcome: "Control, submissions, confidence under pressure",
  },
  Kickboxing: {
    category: "Striking",
    level: "Beginner-friendly",
    outcome: "Striking, conditioning, distance management",
  },
  Wrestling: {
    category: "Grappling",
    level: "Adults and youth",
    outcome: "Takedowns, balance, athletic control",
  },
  Judo: {
    category: "Grappling",
    level: "All levels",
    outcome: "Throws, grip fighting, ground transitions",
  },
  "Adult Gymnastics": {
    category: "Movement",
    level: "Novice-friendly",
    outcome: "Strength, mobility, body control",
  },
  "Youth BJJ and Judo": {
    category: "Youth",
    level: "Kids and teens",
    outcome: "Discipline, teamwork, safe martial arts habits",
  },
};

export default function ProgramExplorer({ compact = false }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visiblePrograms = useMemo(() => {
    if (activeFilter === "All") {
      return programs;
    }

    return programs.filter((program) => programMeta[program.title]?.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className={compact ? "program-explorer compact" : "program-explorer"}>
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Train with purpose</p>
          <h2>Find the class that fits your goals.</h2>
        </div>
        <div className="filter-row" aria-label="Program filters">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? "active" : ""}
              type="button"
              onClick={() => setActiveFilter(filter)}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="program-card-grid">
        {visiblePrograms.map((program) => {
          const meta = programMeta[program.title] ?? {};

          return (
            <article className="program-card-modern" key={program.title}>
              <div className="program-card-top">
                <span>{meta.category ?? "Program"}</span>
                <strong>{meta.level ?? "All levels"}</strong>
              </div>
              <h3>{program.title}</h3>
              <p>{program.body}</p>
              <div className="program-outcome">{meta.outcome}</div>
              <Link href="/free-trial">Try this class</Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
