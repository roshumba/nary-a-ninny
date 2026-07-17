// extend type to make children a required property
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className,...rest }: ButtonProps){
    return(
        <button {...rest} style={{ border: 'solid', margin: '5px' }}
            className={className}>
            {children}
        </button>
    );
}