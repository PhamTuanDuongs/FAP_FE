import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Attendance } from "../types/Attandance";
interface ScheduleProps {
  schedule: Attendance;
}
const Dialog: React.FC<ScheduleProps> = ({ schedule }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkStatus = (status: number) => {
    if (status === 0) {
      return "NOTYET";
    } else if (status === 1) {
      return "ATTENDED";
    } else if (status === 2) {
      return "ABSENT";
    }
  };

  const responseColor = (status: number) => {
    if (status === 0) {
      return "#3572EF";
    } else if (status === 1) {
      return "#1fc859";
    } else if (status === 2) {
      return "#FF0000";
    }
  };
  return (
    <>
      <Box onClick={onOpen} cursor="pointer">
        <div>{schedule.scheduleDTONav.course.code}</div>
        <div>{schedule.scheduleDTONav.instructorCode}</div>
        <div>at {schedule.scheduleDTONav.room}</div>
        <Text color={responseColor(schedule.status)}>
          {checkStatus(schedule.status)}
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Activity Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box display="flex" justifyContent="space-around">
                <Text flex="3" pt="2" fontSize="sm">
                  Date
                </Text>
                <Text flex="8" pt="2" fontSize="sm">
                  {schedule.scheduleDTONav.date}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-around">
                <Text flex="3" pt="2" fontSize="sm">
                  Slot
                </Text>
                <Text flex="8" pt="2" fontSize="sm">
                  {schedule.scheduleDTONav.slot}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-around">
                <Text flex="3" pt="2" fontSize="sm">
                  Course
                </Text>
                <Text flex="8" pt="2" fontSize="sm">
                  {schedule.scheduleDTONav.course.code}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-around">
                <Text flex="3" pt="2" fontSize="sm">
                  Subject
                </Text>
                <Text flex="8" pt="2" fontSize="sm">
                  {schedule.scheduleDTONav.course.subject.name}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-around">
                <Text flex="3" textAlign="left" pt="2" fontSize="sm">
                  Attendance
                </Text>
                <Text
                  flex="8"
                  pt="2"
                  fontSize="sm"
                  color={responseColor(schedule.status)}
                >
                  {checkStatus(schedule.status)}
                </Text>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dialog;
