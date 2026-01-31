import Image from "next/image";
import { Card, CardBody, CardFooter } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import type { Member } from "../types";

interface OfficerCardProps {
  officer: Member;
}

export function OfficerCard({ officer }: OfficerCardProps) {
  return (
    <Card className="border-t-4 border-blue-600 flex flex-col h-full group">
      <CardBody className="text-center flex-grow p-8">
        {/* Avatar dengan Foto */}
        <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          {officer.photo ? (
            <Image
              src={officer.photo}
              alt={officer.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <i className="bi bi-person-fill text-4xl text-slate-400"></i>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{officer.name}</h3>
        <Badge variant="info" className="mb-4">{officer.role}</Badge>
        <p className="text-slate-500 text-sm leading-relaxed">
          {officer.description || "Bertanggung jawab dalam mengelola kegiatan kelas."}
        </p>
      </CardBody>
      <CardFooter className="flex justify-center space-x-4 py-3">
        {officer.instagram && (
          <a href={officer.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors transform hover:scale-110">
            <i className="bi bi-instagram text-lg"></i>
          </a>
        )}
        {officer.linkedin && (
          <a href={officer.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-800 transition-colors transform hover:scale-110">
            <i className="bi bi-linkedin text-lg"></i>
          </a>
        )}
        {!officer.instagram && !officer.linkedin && (
          <span className="text-slate-300 text-xs">No social links</span>
        )}
      </CardFooter>
    </Card>
  );
}