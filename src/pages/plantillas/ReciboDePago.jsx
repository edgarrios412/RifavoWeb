import style from './ReciboDePago.module.css'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from "/BRANDING/rifavoicon.png"
import { formatDate } from '@/utils/helpers/formatter';

// Definir estilos reutilizables
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  line: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BCBCBC',
    borderBottomStyle: 'dashed',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  verifiedText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 30,
    textAlign: 'center',
  },
  data:{
    width:140,
    margin:"0 auto"
  }
});

const ReciboDePago = ({ ticket }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.logo} />
      </View>
      <Text style={styles.header}>Recibo de Ticket #{ticket?.id}</Text>
      <Text style={styles.subHeader}>{formatDate(ticket?.fechaCompra)}</Text>
      <View style={styles.data}>
      <View style={styles.line} />
      <Text style={styles.text}>Sorteo: {ticket?.sorteo.premio1}</Text>
      <Text style={styles.text}>
        Número: {String(ticket?.numero).padStart(String(ticket?.sorteo.cantidadTicket).length - 1, '0')}
      </Text>
      <Text style={styles.text}>
        Fecha: {ticket?.sorteo.fechaSorteo ?? 'Empezará pronto'}
      </Text>
      </View>
      <Text style={styles.verifiedText}>Verificado por RIFAVO</Text>
    </Page>
  </Document>
);

export default ReciboDePago