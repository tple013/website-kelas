import { Card, CardBody, CardFooter } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import type { Project } from "../types";

const statusConfig = {
  completed: { variant: "success" as const, label: "Selesai", icon: "bi-check-circle-fill" },
  "in-progress": { variant: "info" as const, label: "Dalam Proses", icon: "bi-arrow-repeat" },
  planned: { variant: "default" as const, label: "Direncanakan", icon: "bi-calendar" },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <Card className="flex flex-col h-full group">
      <CardBody className="flex-grow p-8">
        {/* Title & Status */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
            {project.title}
          </h2>
          <Badge variant={status.variant} className="flex-shrink-0">
            <i className={`bi ${status.icon} mr-1`}></i>
            {status.label}
          </Badge>
        </div>

        <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Teknologi</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kontributor</h3>
          <div className="flex items-center -space-x-2 overflow-hidden">
            {project.teamMembers.slice(0, 5).map((member, idx) => (
              <div
                key={idx}
                className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 items-center justify-center text-xs text-slate-500 font-bold"
                title={member}
              >
                {member.charAt(0)}
              </div>
            ))}
            {project.teamMembers.length > 5 && (
              <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 items-center justify-center text-xs text-slate-500 font-medium">
                +{project.teamMembers.length - 5}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-2">{project.teamMembers.join(", ")}</p>
        </div>
      </CardBody>

      {project.githubUrl && (
        <CardFooter className="flex justify-end">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <i className="bi bi-github text-lg"></i>
            <span>Lihat Repository</span>
            <i className="bi bi-arrow-right"></i>
          </a>
        </CardFooter>
      )}
    </Card>
  );
}