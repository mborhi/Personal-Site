import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'

const PictureModal = ({ image, open, handleModal, title }) => {

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
                        <Button colorScheme='blue' mr={3} onClick={() => handleClose()}>
                            Close
                        </Button>
                        <Button variant='ghost'>Download</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PictureModal;