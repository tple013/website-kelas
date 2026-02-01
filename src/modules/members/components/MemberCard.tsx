"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter } from "@/shared/components/ui/Card";
import { ExpandableText } from "@/shared/components/ui/ExpandableText";
import { getAssetPath, getAvatarFallback } from "@/lib/utils";
import type { Member } from "@/lib/types";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const photoSrc = imgError || !member.photo 
    ? getAvatarFallback(member.name)
    : getAssetPath(member.photo);

  return (
    <Card className="flex flex-col h-full transform hover:-translate-y-1">
      <CardBody className="text-center flex-grow p-6">
        {/* Avatar dengan Foto */}
        <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden bg-slate-100 flex items-center justify-center">
          <Image
            src={photoSrc}
            alt={member.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white line-clamp-2 min-h-[40px]">{member.name}</h3>
        {member.description && (
          <div className="mt-2">
            <ExpandableText 
              text={member.description} 
              maxLines={2} 
              className="text-xs text-slate-500 dark:text-slate-400"
              title={member.name}
            />
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-center space-x-3 py-2">
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-pink-600 transition-colors">
            <i className="bi bi-instagram"></i>
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-blue-700 transition-colors">
            <i className="bi bi-linkedin"></i>
          </a>
        )}
        {!member.instagram && !member.linkedin && (
          <span className="text-slate-300 dark:text-slate-600 text-xs">No social links</span>
        )}
      </CardFooter>
    </Card>
  );
}