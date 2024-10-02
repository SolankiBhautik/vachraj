import Image from 'next/image';

const StrapiImage = ({ image, className = '' }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    const getImageData = () => {
        // Use the largest available format as the default
        const defaultFormat = image || image.formats.large || image.formats.medium || image.formats.small;
        return {
            url: `${baseUrl}${defaultFormat.url}`,
            width: defaultFormat.width,
            height: defaultFormat.height,
        };
    };

    const defaultImageData = getImageData();

    // Construct the srcSet dynamically using available formats
    const srcSet = Object.entries(image.formats || {})
        .map(([size, formatData]) => `${baseUrl}${formatData.url} ${formatData.width}w`)
        .join(', ');

    return (
        <Image
            className={className}
            src={defaultImageData.url} // Default to largest format
            alt={image.alternativeText || image.name}
            width={defaultImageData.width}
            height={defaultImageData.height}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            srcSet={srcSet}
        />
    );
};

export default StrapiImage;