import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiChevronDown,
  FiCalendar,
  FiUserCheck,
  FiCheckCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Weekly Timetable",
    icon: FiCalendar,
    url: "/Student/Report/ScheduleOfWeek ",
  },
  {
    name: "Take Attendance",
    icon: FiCheckCircle,
    url: "/takeAttendance",
  },
  {
    name: "Attendance Report",
    icon: FiUserCheck,
    url: "/Student/Report/Attendance",
  },

  {
    name: "Create a new Course",
    icon: FiPlusCircle,
    url: "/Add/Course",
  },

  {
    name: "View List of Courses",
    icon: FiPlusCircle,
    url: "/Courses",
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box
          marginTop="80px"
          ml={{ base: 0, md: 60 }}
          p="4"
          flexGrow="1"
          position="relative"
        >
          {children}
        </Box>
      </Box>
      <Box ml={{ base: 0, md: 60 }} marginBottom="0" alignSelf="flex-start">
        <Text>
          {" "}
          © 2024 <span>™Power by Group 4</span>. All Rights Reserved.
        </Text>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      marginTop="50px"
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      width="full"
      {...rest}
    >
      <Box marginTop={10}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.url}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}
const NavItem = ({ icon, link, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      alignItems="center"
      gap="2"
      position="fixed"
      top="0"
      right="0"
      width="100%"
      bg={useColorModeValue("white", "gray.900")}
      px={{ base: 4, md: 4 }}
      height="20"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      zIndex={33}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box>
        <Image
          boxSize="150px"
          objectFit="fill"
          src="/images/FPT.svg"
          alt="Dan Abramov"
        />
      </Box>
      <Spacer />
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  backgroundColor="black"
                  color="white"
                  name="Pham Tuan Duong"
                  size={"sm"}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
