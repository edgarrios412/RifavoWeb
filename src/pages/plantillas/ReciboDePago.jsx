import style from './ReciboDePago.module.css'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from "/BRANDING/rifavoicon.png"
import { formatDate } from '@/utils/helpers/formatter';
import QRCode from "react-qr-code";

// Definir estilos reutilizables
const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: '7.5cm',
    height: '20cm',
    border: '1px dashed #BCBCBC',
  },
  logoContainer: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    marginBottom: 5,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 8,
    marginBottom: 8,
    textAlign: 'center',
    color: '#555',
  },
  line: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#BCBCBC',
    borderBottomStyle: 'dashed',
  },
  text: {
    fontSize: 9,
    marginBottom: 3,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  data: {
    width: '100%',
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  footerText: {
    fontSize: 8,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  },
  qrContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: 80,
    height: 80,
  },
});

// Componente del recibo
const ReciboDePago = ({ ticket, qrCode }) => (
  <Document>
    <Page style={styles.page}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.logo} />
        {/* <Text style={styles.header}>RIFAVO LOTERÍAS</Text> */}
      </View>

      {/* Información del ticket */}
      <View style={styles.data}>
        <Text style={styles.subHeader}>Recibo de Ticket #{ticket?.id}</Text>
        <Text style={styles.subHeader}>{formatDate(ticket?.fechaCompra)}</Text>
        <View style={styles.line} />

        <Text style={styles.text}>
          <Text style={styles.boldText}>Sorteo:</Text> {ticket?.sorteo.premio1}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Número:</Text> {String(ticket?.numero).padStart(String(ticket?.sorteo.cantidadTicket).length - 1, '0')}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Fecha del Sorteo:</Text> {ticket?.sorteo.fechaSorteo ?? 'Empezará pronto'}
        </Text>
        <View style={styles.line} />

        {/* Monto y precio */}
        <Text style={styles.text}>
          <Text style={styles.boldText}>Precio del Ticket:</Text> ${Number(ticket?.sorteo.precioTicket).toFixed(2)}
        </Text>
        {/* <Text style={styles.text}>
          <Text style={styles.boldText}>Cantidad:</Text> {ticket?.cantidad}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Total:</Text> ${(ticket?.precio * ticket?.cantidad)}
        </Text> */}

        <View style={styles.line} />
      </View>

      {/* QR Code para verificar */}
      <View style={styles.qrContainer}>
        <Image source={{ uri: qrCode }} style={styles.qrCode} />
        <Text style={styles.footerText}>Verifica tu ticket escaneando el código QR</Text>
      </View>

      {/* Texto final */}
      <Text style={styles.footerText}>Gracias por su compra</Text>
      <Text style={styles.footerText}>¡Buena suerte!</Text>
    </Page>
  </Document>
);

export default ReciboDePago