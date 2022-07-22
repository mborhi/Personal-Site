import { Text, Link } from "@chakra-ui/react";

interface SpanProps {
    text: string
    link?: string
    decoration?: string
    style?: string
}
const SpanText = ({ text, link, decoration, style }: SpanProps) => {
    return (
        <Text as={'span'} textDecoration={decoration ? decoration : ''} fontStyle={style ? style : ''}>
            {link ? (
                <Link href={link}>{text}</Link>
            ) : (
                text
            )}
        </Text>
    )
}

export default SpanText;