import React from "react";
import {ImageResponsiveType} from "@/config";

interface ImageResponsiveProps {
    image: ImageResponsiveType
}

export const ImageResponsive: React.FC<ImageResponsiveProps> = ({image}: ImageResponsiveProps) => {
    return (
        <picture>
            <source
                media="(max-width: 768px)"
                srcSet={`/images/${image.img.src} ${image.img.width}w`}
                sizes={`${image.img.width}px`}
            />
            <source
                media="(max-width: 1200px)"
                srcSet={`/images/${image.largeImg.src} ${image.largeImg.width}w`}
                sizes={`${image.largeImg.width}px`}
            />
            <img src={`/images/${image.largeImg.src}`} alt={image.alt}/>
        </picture>
    )
}

