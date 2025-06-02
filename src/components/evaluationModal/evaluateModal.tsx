import {
    Button,
    Input,
    Switch,
    Dialog,
    Field,
    FieldLabel,
    Portal,
    CloseButton,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { HiCheck, HiX } from "react-icons/hi"
import { useState } from "react";
import { createEvaluation } from "../../api";
import '../../pages/suggestionRegisterStyle.css'

interface EvaluationData {
    errorCode: string,
    clientCode: string,
    rating: boolean,
    comment?: string,
    suggestionId: number
}

function EvaluateDialog({ suggestionId, suggestionError }: { suggestionId: number, suggestionError: string }) {
    const [errorCode, setErrorCode] = useState(suggestionError);
    const [clientCode, setClientCode] = useState('');
    const [rating, setRating] = useState(false);
    const [comment, setComment] = useState('');
    const [clientCodeError, setClientCodeError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validate = () => {
        if (!clientCode) {
            setClientCodeError("O código de cliente é obrigatório.");
            return false;
        }
        if (!/^\d{6}$/.test(clientCode)) {
            setClientCodeError("O código de cliente deve conter 6 dígitos.");
            return false;
        }
        setClientCodeError(null)
        return true
    };

    const handleRegister = async () => {
        if (!validate()) return;

        const data: EvaluationData = {
            errorCode,
            clientCode,
            rating,
            comment,
            suggestionId
        }
        try {
            setIsSubmitting(true);
            await createEvaluation(data);
            alert('Avaliação cadastrada!');
            setClientCode('');
            setComment('');
        } catch (err) {
            console.error(err);
            alert('Erro ao cadastrar avaliação.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearField = () => {
        setClientCode('');
        setComment('');
        setRating(false);
        setClientCodeError('')
    }

    return (
        <Dialog.Root >
            <Stack className="box-button">
                <Dialog.Trigger asChild>
                    <Button className="stack-button" variant="ghost" >Avaliar</Button>
                </Dialog.Trigger>
            </Stack>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner display="flex" alignItems="center" >
                    <Dialog.Content color="white" backgroundColor="black">
                        <Dialog.Header>
                            <Dialog.Title>Avalie essa sugestão</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap="8" css={{ "--field-label-width": "20rem" }}>
                                <Field.Root orientation="vertical" required={true} invalid={!!clientCodeError}>
                                    <FieldLabel gap={5}>
                                        <Text>Código de cliente:</Text>
                                        <Input
                                            flex="1"
                                            borderColor="#242424"
                                            maxLength={6}
                                            required={true}
                                            value={clientCode}
                                            onChange={e => setClientCode(e.target.value)}
                                            placeholder="Insira o código de cliente"
                                        />
                                    </FieldLabel>
                                    {clientCodeError && (
                                        <Field.ErrorText>{clientCodeError}</Field.ErrorText>
                                    )}
                                </Field.Root>
                                <Field.Root orientation="horizontal">
                                    <FieldLabel gap={5}>
                                        Comentário:
                                        <Textarea
                                            width="14rem"
                                            resize="vertical"
                                            rows={3}
                                            marginLeft="2.4rem"
                                            flex="1"
                                            borderColor="#242424"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            placeholder="Insira seu comentário" />
                                    </FieldLabel>
                                </Field.Root>
                                <Field.Root>
                                    <Switch.Root
                                        checked={rating}
                                        onCheckedChange={(e) => setRating(e.checked)}>
                                        <Switch.Label justifyContent="space-between">
                                            Avaliação positiva?
                                        </Switch.Label>
                                        <Switch.HiddenInput />
                                        <Switch.Control>
                                            <Switch.Thumb>
                                                <Switch.ThumbIndicator fallback={<HiX color="black" />}>
                                                    <HiCheck color="black" />
                                                </Switch.ThumbIndicator>
                                            </Switch.Thumb>
                                        </Switch.Control>
                                    </Switch.Root>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button className="cancel-button" variant="outline" onClick={clearField}>Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleRegister}>Salvar</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default EvaluateDialog;
