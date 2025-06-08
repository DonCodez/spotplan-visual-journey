
import { 
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain 
} from "@/components/ui/card-curtain-reveal"

interface LocationCardProps {
  title: string
  subtitle: string
  description: string
  imageSrc: string
  emoji: string
}

const LocationCard = ({ title, subtitle, description, imageSrc, emoji }: LocationCardProps) => {
  return (
    <CardCurtainReveal className="h-64 w-full border border-gray-200 bg-white text-gray-800 shadow-sm rounded-lg">
      <CardCurtainRevealBody className="p-4">
        <div className="text-2xl mb-2">{emoji}</div>
        <CardCurtainRevealTitle className="text-lg font-semibold mb-1">
          {title}
        </CardCurtainRevealTitle>
        <div className="text-sm text-gray-600 mb-2">{subtitle}</div>
        <CardCurtainRevealDescription className="text-sm text-gray-700">
          {description}
        </CardCurtainRevealDescription>
        <CardCurtain className="bg-white" />
      </CardCurtainRevealBody>

      <CardCurtainRevealFooter className="mt-auto h-32">
        <img
          width="100%"
          height="100%"
          alt={title}
          className="object-cover w-full h-full"
          src={imageSrc}
        />
      </CardCurtainRevealFooter>
    </CardCurtainReveal>
  )
}

export default LocationCard;
