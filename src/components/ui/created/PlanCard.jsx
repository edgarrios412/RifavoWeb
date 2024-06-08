import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion"

const PlanCard = ({plan, color, delay}) => {

  const colors = ["bg-gradient-to-r from-blue-200 to-cyan-200","bg-gradient-to-r from-violet-200 to-pink-200","bg-gradient-to-r from-orange-300 to-amber-300"]

  return (
    <motion.Card initial={{y:30, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:delay, duration:.3}} className="w-full flex flex-col justify-between border border-slate-200 shadow-sm rounded-lg">
      <div>
        <CardHeader className={`text-center text-white 0 ${colors[color]} rounded-t-sm`}>
          <CardTitle className="text-lg text-black ">{plan.name}</CardTitle>
          {/* <CardDescription>
                        $499,999/mes
                      </CardDescription> */}
        </CardHeader>
        <CardContent>
          {plan.price ? (
            <div className="flex font-bold justify-center my-5">
              <span className="self-start">$</span>
              <span className="self-center text-2xl">{plan.price}</span>
              <span className="self-end">/{plan.periodFact}</span>
            </div>
          ) : (
            <div className="flex font-bold justify-center my-5">
              <span className="self-center text-2xl">Contactanos</span>
            </div>
          )}
          <h3 className="font-bold my-4">Beneficios</h3>
          <div className="flex flex-col gap-3 text-gray-600">
            {plan?.benefits?.map(b => <p className="flex gap-2">
              <Check className="min-w-3.5 max-w-3.5" />
              <span className="text-sm" dangerouslySetInnerHTML={{ __html: b }}>
              </span>
            </p>)}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={() => plan.action()} className={`w-full text-black font-bold ${colors[color]}`}>
          Adquirir plan
        </Button>
      </CardFooter>
    </motion.Card>
  );
};

export default PlanCard
