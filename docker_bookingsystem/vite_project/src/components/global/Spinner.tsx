type SpinnerProps = {
    size?: number;
    className?: string;
};

export function Spinner({ size = 40, className }: SpinnerProps) {
    return (
        <span
            className={className}
            style={{
                width: size,
                height: size,
                display: "inline-block",
                backgroundImage: 'url("/loading.svg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
            }}
            role="status"
            aria-label="Loading"
        />
    );
}
