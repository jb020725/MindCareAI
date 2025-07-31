// src/components/shared/AvatarCard.tsx
interface AvatarCardProps {
  label: string;
  description: string;
}

const AvatarCard = ({ label, description }: AvatarCardProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-md font-medium text-gray-800">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
};

export default AvatarCard;
