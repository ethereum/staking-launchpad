import React from 'react';
import { HashLink as Anchor } from 'react-router-hash-link';
import styled from 'styled-components';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const FAQStyles = styled.div`
  section {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
  }
`;

const BlockQuote = styled.div`
  margin-top: 10px;
  padding-left: 20px;
  border-left: 5px solid lightgray;
`;

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

export const FAQEs = () => {
  return (
    <PageTemplate title="FAQs Validadores">
      <FAQStyles>
        <section>
          <Anchor to="#introduction" id="introduction">
            <SectionTitle level={3}>Introducción</SectionTitle>
          </Anchor>

          <section>
            <Heading level={4}>¿Qué es exactamente un validador?</Heading>
            <Text className="mt10">
              Un validador es una entidad que participa en el consenso del protocolo de 
              Ethereum 2.0.
            </Text>
            <Text className="mt10">
              O, en lenguaje llano, un humano ejecutando un proceso informático. Este 
              proceso propone y asegura que se añadan nuevos bloques a la cadena de bloques.
            </Text>
            <Text className="mt10">
              En otras palabras,{' '}
              <strong>
              puedes pensar en un validador como un candidato para los nuevos bloques.  
              </strong>
              Cuantos más votos tenga un bloque, más probable es que se añada a la cadena.
            </Text>
            <Text className="mt10">
              Es importante que el voto de un validador sea ponderado por la cantidad que 
              está en juego.
            </Text>
          </section>
          <section>
            <Heading level={4}>¿Qué es el contrato de depósito?</Heading>
            <Text className="mt10">
              Puedes pensar en ello como una transferencia de fondos entre las cuentas de 
              Ethereum y los validadores de eth2.
            </Text>
            <Text className="mt10">
              Especifica quién participa, quién valida, cuánto se participa y quién puede 
              retirar los fondos.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Por qué los validadores necesitan tener fondos en juego?
            </Heading>
            <Text className="mt10">
              Los validadores necesitan tener fondos en juego para poder ser penalizados por 
              su comportamiento deshonesto.
            </Text>
            <Text className="mt10">
              En otras palabras, para que sean honestos, sus acciones deben tener 
              consecuencias financieras.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Cuánto ETH necesita depositar un validador?
            </Heading>
            <Text className="mt10">
              Antes de que un validador pueda empezar a asegurar la red, necesita depositar 
              <strong>32 ETH.</strong> Esto forma el balance inicial del validador.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Hay alguna ventaja en tener más de 32 ETH en juego?
            </Heading>
            <Text className="mt10">
              No. No hay ninguna ventaja en tener más de 32 ETH en juego.
            </Text>
            <Text className="mt10">
              Limitar la participación máxima a 32 ETH fomenta la descentralización 
              del poder, ya que impide que un solo validador tenga un voto excesivamente 
              grande sobre el estado de la cadena.
            </Text>
            <BlockQuote>
              <Text>
              Recuerda que el voto de un validador es ponderado por la cantidad que 
              tiene en participación.
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              ¿Puedo parar mi validador por unos días y luego volver a 
              iniciarlo?
            </Heading>
            <Text className="mt10">
              Sí, pero, en condiciones normales, perderá una cantidad de 
              ETH aproximadamente equivalente a la cantidad de ETH que habría 
              ganado en ese período. En otras palabras, si usted ganara ≈0.01 ETH, 
              sería penalizado con ≈0.01 ETH.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Cuándo debo actualizar el balance de mi validador?
            </Heading>
            <Text className="mt10">
              La respuesta a esta pregunta depende en gran medida de 
              la cantidad de ETH que tenga a su disposición.
            </Text>
            <Text className="mt10">
              Ciertamente debes aumentar tu balance si está cerca de 16 ETH: 
              esto es para asegurarte de que no te echen del conjunto de validadores 
              (lo cual ocurre automáticamente si tu balance cae por debajo de 16 ETH).
            </Text>
            <Text className="mt10">
              En el otro extremo del escenario, si tu balance está más cerca de 31 ETH, 
              probablemente no valga la pena añadir los ETHs extras necesarios para alcanzar 32.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Cuándo puedo retirar mis fondos, y cuál es la diferencia entre salir y retirarlos?
            </Heading>
            <Text className="mt10">
              Puede indicar su intención de dejar de validar firmando un mensaje de salida voluntaria 
              con su validador.
            </Text>
            <Text className="mt10">
              Sin embargo, ten en cuenta que en la fase 0, una vez que has salido, no hay vuelta atrás.
            </Text>
            <Text className="mt10">
              No hay forma de que puedas habilitar tu validador de nuevo, y no podrás transferir o retirar 
              tus fondos hasta por lo menos la fase 1.5 (lo que significa que tus fondos permanecerán inaccesibles 
              hasta entonces).
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#responsibilities" id="responsibilities">
            <SectionTitle level={3}>Responsabilidades</SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              ¿Cómo se incentivan los validadores para que se mantengan activos y honestos?
            </Heading>
            <Text className="mt10">
              Además de ser sancionados por estar fuera de línea, los validadores son sancionados 
              por comportarse de manera maliciosa - por ejemplo, mediante la certificación de bloques 
              inválidos o contradictorios.
            </Text>
            <Text className="mt10">
              Por otro lado, son recompensados por proponer / dar fe de los bloques que se incluyen en la cadena.
            </Text>
            <Text className="mt10">El concepto clave es el siguiente:</Text>
            <ul>
              <li>
                Se recompensan las acciones que ayudan a la red a llegar a un consenso
              </li>
              <li>
                Se imponen sanciones menores por acciones descuidadas (o inexistentes) que 
                impiden el consenso
              </li>
              <li>
                Y se dan penalizaciones importantes - o <strong>recortes</strong> - por acciones 
                maliciosas
              </li>
            </ul>
            <Text className="mt10">
              En otras palabras, los validadores que maximizan sus recompensas también proporcionan el 
              mayor beneficio a la red en su conjunto.
            </Text>
          </section>
          <section>
            <Heading level={4}>¿Cómo se establecen las recompensas/penalizaciones?</Heading>
            <Text className="mt10">
              Recuerde que cada validador tiene su propio balance - con el balance 
              inicial indicado en el contrato de depósito.
            </Text>
            <Text className="mt10">
              Este balance se actualiza periódicamente mediante las reglas de la red Ethereum 
              a medida que el validador cumple (o deja de cumplir) sus responsabilidades.
            </Text>
            <Text className="mt10">
              Dicho de otra manera, las recompensas y penalizaciones se reflejan en el balance del 
              validador a lo largo del tiempo.
            </Text>
          </section>
          <section>
            <Heading level={4}>¿Con qué frecuencia se emiten recompensas/penalizaciones?</Heading>
            <Text className="mt10">
              Aproximadamente cada seis minutos y medio, un período de tiempo conocido como una época.
            </Text>
            <Text className="mt10">
              En cada época, la red evalúa las acciones de cada validador y emite recompensas o 
              penalizaciones de manera adecuada.
            </Text>
          </section>
          <section>
            <Heading level={4}>¿Qué cantidad de recompensas y penalizaciones hay?</Heading>
            <Text className="mt10">
              No hay una respuesta fácil a esta pregunta ya que hay muchos factores que 
              entran en este cálculo.
            </Text>
            <Text className="mt10">
              Podría decirse que el factor de mayor impacto en las recompensas obtenidas 
              por la validación de las transacciones es la cantidad total de participación 
              en la red. En otras palabras, la cantidad total de validadores. Dependiendo de 
              esta cifra, la tasa máxima de retorno anual para un validador puede estar entre 
              el 2 y el 20%.
            </Text>
            <Text className="mt10">
              Dado un número total fijo de validadores, las recompensas/penalidades se escalan 
              principalmente con el balance del validador - asegurar un balance más alto resulta 
              en mayores recompensas/penalizaciones mientras que asegurar un balance más bajo 
              resulta en menores recompensas/penalizaciones.
            </Text>
            <BlockQuote>
              <Text className="mt10">
              Sin embargo, hay que tener en cuenta que este mecanismo de escalado 
              funciona de una manera no obvia. Para entender los detalles precisos 
              de su funcionamiento es necesario comprender un concepto llamado{' '} 
              <strong>equilibrio efectivo</strong>. Si aún no está familiarizado con este concepto, 
              le recomendamos que lea este{' '}
                <Link
                  primary
                  inline
                  external
                  to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
                >
                  post excelente.
                </Link>
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              ¿Por qué las recompensas dependen del número total de validadores en la red?
            </Heading>
            <Text className="mt10">
              Las recompensas de bloque se calculan usando una escala gradual basada en la 
              cantidad total de ETH depositada en la red.
            </Text>
            <Text className="mt10">
              En pocas palabras: si la cantidad total de ETH depositada es baja, la 
              recompensa (tasa de interés) es alta, pero a medida que la cantidad total 
              depositada aumenta, la recompensa (interés) pagada a cada validador comienza 
              a disminuir.
            </Text>
            <Text className="mt10">
              ¿Por qué una escala gradual? Aunque no entraremos en detalles escabrosos aquí, 
              la intuición básica es que se necesita un número mínimo de validadores (y por lo 
              tanto una cantidad mínima de ETH en juego) para que la red funcione correctamente. 
              Por lo tanto, para incentivar a más validadores que se unan, es importante que la 
              tasa de interés se mantenga alta hasta que se alcance este número mínimo.
            </Text>
            <Text className="mt10">
              Posteriormente, se sigue alentando a los validadores a que se unan 
              (cuantos más validadores más descentralizada está la red), pero no es absolutamente 
              esencial que lo hagan (para que el tipo de interés pueda bajar).
            </Text>
          </section>
          <section>
            <Heading level={4}>
            ¿Qué tan grave será la penalización de un validador por estar desconectado?
            </Heading>
            <Text className="mt10">
            Depende. Además del{' '}
              <Link
                inline
                primary
                external
                to="https://www.attestant.io/posts/understanding-validator-effective-balance/#the-impact-of-effective-balance-on-validating"
              >
                impacto del equilibrio efectivo
              </Link>{' '}
              hay dos escenarios importantes que hay que tener en cuenta:
            </Text>
            <ol>
              <li>
                <Text className="mt10">
                Estar fuera de la red mientras una gran mayoría (2/3) de los 
                validadores está todavía en línea conduce a penalizaciones relativamente 
                pequeñas ya que todavía hay suficientes validadores en línea para que la cadena 
                finalice.{' '} <strong>Este es el escenario esperado.</strong>
                </Text>
              </li>
              <li>
                <Text className="mt10">
                Estar fuera de línea al mismo tiempo que más de 1/3 del número total de validadores 
                conduce a penalizaciones más fuertes, ya que los bloques no finalizan.{' '} <strong>Este escenario 
                es muy extremista y es poco probable que ocurra.</strong>
                </Text>
              </li>
            </ol>
            <BlockQuote>
              <Text className="mt10">
              Nótese que en el segundo (improbable) escenario, los validadores perderán progresivamente hasta el 50% 
              (16 ETH) de su participación a lo largo de 21 días. Después de 21 días son expulsados de la lista de validadores. 
              Esto asegura que los bloques empiecen a finalizar de nuevo en algún momento.
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              ¿Qué tan excelente debe ser el tiempo de actividad de un validador honesto para que sea rentable?
            </Heading>
            <Text className="mt10">
              En general, se espera que los validadores sean rentables, siempre y cuando su tiempo de 
              funcionamiento sea{' '}
              <Link
                external
                to="https://blog.ethereum.org/2020/01/13/validated-staking-on-eth2-1-incentives/"
              >
                superior al 50%.
              </Link>
            </Text>
            <Text className="mt10">
            Esto significa que los validadores no necesitan llegar a extremos 
            con clientes de respaldo o conexiones de internet redundantes ya que las 
            repercusiones de estar fuera de línea no son tan severas.  
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Cuánto se sancionará a un validador por actuar de manera maliciosa?
            </Heading>
            <Text className="mt10">
              De nuevo, depende. Comportarse maliciosamente - por ejemplo, 
              demostrando bloques inválidos o contradictorios, conducirá a que la 
              participación de un validador sea recortada.
            </Text>
            <Text className="mt10">
              La cantidad mínima que puede ser recortada es 1 ETH, pero{' '}
              <strong>
                este número aumenta si otros validadores son penalizados al 
                mismo tiempo.
              </strong>  
            </Text>
            <Text className="mt10">
              La idea detrás de esto es minimizar las pérdidas por errores honestos, 
              pero desanimar en gran medida los ataques coordinados.
            </Text>
          </section>
          <section>
            <Heading level={4}>¿Qué es exactamente la penalización?</Heading>
            <Text className="mt10">
            La penalización tiene dos propósitos: (1) hacer que sea prohibitivamente caro atacar eth2, 
            y (2) evitar que los validadores sean perezosos comprobando que realmente cumplen con sus 
            obligaciones. Penalizar a un validador es destruir (una porción de) la participación del validador 
            si actúa de una manera destructiva.
            </Text>
            <Text className="mt10">
              A los validadores que son penalizados se les impide seguir participando en el protocolo y se 
              les expulsa por la fuerza.
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#keys" id="keys">
            <SectionTitle level={3}>Claves</SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>¿Qué pasa si pierdo mi clave de firma?</Heading>
            <Text className="mt10">
              Si se pierde la clave de firma, el validador ya no puede proponer o confirmar.
            </Text>
            <Text className="mt10">
              Con el tiempo, el balance del validador disminuirá a medida que se le penalice por no 
              participar en el proceso de consenso. Cuando el balance del validador llegue a 16 Eth, 
              él o ella saldrá automáticamente del grupo de validadores.
            </Text>
            <BlockQuote>
              <Text className="mt10">
                Sin embargo, no todo está perdido. Suponiendo que los validadores deriven sus claves 
                usando{' '}
                <Link
                  primary
                  inline
                  external
                  to="https://eips.ethereum.org/EIPS/eip-2334"
                >
                  EIP2334
                </Link>{' '}
                (según el esquema de integración por defecto),{' '}
                <strong>
                los validadores siempre pueden volver a calcular su clave de firma a partir de su clave 
                de retirada.
                </strong>
              </Text>
            </BlockQuote>
            <Text className="mt10">
              Los 16 Eth pueden ser retirados - con la clave de retirada - después de un plazo de 
              alrededor de un día.
            </Text>
            <BlockQuote>
              <Text className="mt10">
              Tenga en cuenta que este plazo puede ser más largo si muchos otros salen o son 
              expulsados al mismo tiempo.
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              ¿Qué pasa si pierdo mi clave de retirada?
            </Heading>
            <Text className="mt10">
              Si se pierde la clave de retirada, no hay forma de obtener 
              acceso a los fondos en posesión del validador.
            </Text>
            <Text className="mt10">
            Por lo tanto, es una buena idea crear tus claves a partir de 
            mnemotécnicos que actúan como otra copia de seguridad. Este será 
            el método predeterminado para los validadores que se unan a través 
            del proceso de incorporación de este sitio.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              ¿Qué pasa si me roban la clave de retirada?
            </Heading>
            <Text className="mt10">
              Si la clave de retirada es robada, el ladrón 
              puede transferir el saldo del validador, pero 
              sólo una vez que el validador haya salido.
            </Text>
            <Text className="mt10">
              Si la llave de firma no está bajo el control del 
              ladrón, éste no puede sacar el validador.
            </Text>
            <Text className="mt10">
              El usuario con la clave de firma podría intentar 
              salir rápidamente del validador y luego transferir 
              los fondos - con la clave de retirada - antes que el ladrón.
            </Text>
          </section>
          <section>
            <Heading level={4}>¿Por qué dos claves en vez de una?</Heading>
            <Text className="mt10">
              En resumen, de seguridad. La clave de firma debe estar disponible 
              en todo momento. Como tal, tendrá que ser mantenida online. Como todo 
              lo que está online es vulnerable a ser hackeado, no es una buena idea 
              usar la misma clave para las retiradas.
            </Text>
          </section>
        </section>
      </FAQStyles>
    </PageTemplate>
  );
};
