import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    chakra
} from '@chakra-ui/react'

import { AiOutlineDown } from 'react-icons/ai';

interface Option {
    name: string
    value: any
}
interface Props {
    selector: (selection) => void
    options: Option[]
    selected: string
    comingSoon: boolean

}
const MenuOptions = ({ selector, options, selected, comingSoon }: Props) => {

    const changeSelection = (change) => {
        const value = change.target.value;
        const name = change.target.name;
        selector({ name: name, value: value });
    }

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
                {selected}
            </MenuButton>
            <MenuGroup>
                <MenuList>
                    {options.map((option, idx) => (
                        <MenuItem onClick={(change) => changeSelection(change)} value={option.value} name={option.name} key={idx}>{option.name}</MenuItem>

                    ))}
                    {comingSoon ? (<MenuItem isDisabled>More Coming Soon!</MenuItem>) : <></>}
                </MenuList>
            </MenuGroup>
        </Menu>
    )
}

export default MenuOptions;