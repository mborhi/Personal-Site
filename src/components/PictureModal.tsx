import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import { ReactElement } from 'react';

interface Props {
    title: string
    image: ReactElement
    open: boolean
    handleModal: () => void
    action: (src: string, name: string) => void
}

const PictureModal = ({ title, image, open, handleModal, action }: Props) => {

    const handleClose = () => {
        handleModal();
    }

    return (
        <>

            <Modal isOpen={open} onClose={() => handleClose()} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {image}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleModal()}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={() => action('imageSource', `${title}`)}>Download</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PictureModal;