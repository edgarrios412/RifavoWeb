import style from './ReciboDePago.module.css'
import {Document, Page, View, Text, Image} from "@react-pdf/renderer"
import logo from "/BRANDING/rifavoicon.png"

const ReciboDePago = ({ticket}) => {

    return (
        <>
            <Document>
                <Page>
                <View style={{marginTop:"30px"}} className={style.pacientes}>
                    <Image
                    source={{uri:logo}}
                    style={{width:"150px", margin:"0 auto", textAlign:"center"}}
                    />
          <><Text style={{textAlign:"center", margin:"20px 0px", fontSize:"14px"}}>Recibo de Ticket #{ticket?.id}</Text>
          <Text style={{textAlign:"center", margin:"0px 0px", fontSize:"14px"}}>Sorteo: {ticket?.sorteo.premio1}</Text>
          <Text style={{textAlign:"center", margin:"0px 0px", fontSize:"14px"}}>Numero: {String(ticket?.numero).padStart(String(ticket?.sorteo.cantidadTicket).length-1,"0")}</Text>
          <Text style={{textAlign:"center", margin:"0px 0px", fontSize:"14px"}}>Fecha: {ticket?.sorteo.fechaSorteo ?? "Empezará pronto" }</Text>
            <Text style={{textAlign:"center", fontWeight:"800", marginTop:"40px", fontSize:"10px"}}>Verificado por RIFAVO</Text>
            </>
          </View>
                </Page>
            </Document>
        </>
    )
}

export default ReciboDePago