import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import imgcuadrada from '../../../public/imgcuadrada.jpg';
 
const Carrusel = ({imagenes}) => {
  return (
    <Carousel className="w-2/3 lg:w-full max-w-xs">
      <CarouselContent>
        {imagenes.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <img className="rounded-sm" src={img}></img>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Carrusel