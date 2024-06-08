import PlanCard from "./PlanCard"

const PlanCards = ({plans}) => {
    return (
        <div className="flex justify-center gap-8 items-stretch">
            {plans?.map((plan, index) => <PlanCard plan={plan} color={index} delay={index*0.2}/>)}
        </div>
    )
}

export default PlanCards