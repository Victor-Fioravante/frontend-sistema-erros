import { Heading, Stack } from "@chakra-ui/react"
import { Text } from "recharts";
import './suggestionRegisterStyle.css'

const StartMessage = () => {
    return (
        <Stack className="start-message">
            <Heading>
                Boas-vindas ao sistema de gerenciamento sugestões e avaliações dos erros de comunicação com o governo!
            </Heading>
            <Text>
                Selecione uma das opções acima para continuar
            </Text>
        </Stack>
    )
}

export default StartMessage;