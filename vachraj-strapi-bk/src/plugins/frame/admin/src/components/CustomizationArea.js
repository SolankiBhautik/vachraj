import '../styles/CustomizationArea.css'; // Add your CSS here

import React, { useState, useRef } from 'react';
import { Box, Button, Radio, RadioGroup, EmptyStateLayout } from '@strapi/design-system';
import { Cross, PicturePlus, Plus, Trash } from '@strapi/icons';
import axios from 'axios';

const CustomizationArea = ({ onChange, previewImage, customizationZone }) => {
    const [image, setImage] = useState(previewImage || null);
    const [indicators, setIndicators] = useState(customizationZone || []);
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentRect, setCurrentRect] = useState(null);
    const [selectedIndicator, setSelectedIndicator] = useState(null);
    const [selectedType, setSelectedType] = useState("image");
    const [showModal, setShowModal] = useState(false);
    const [Modal, setModal] = useState({ x: 0, y: 0 });
    const [canCreateRectangle, setCanCreateRectangle] = useState(false);

    const imageRef = useRef(null);
    const fileInputRef = useRef(null);


    // Function to upload the image file
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data[0];
        } catch (error) {
            console.error('Failed to upload image', error);
            throw error;
        }
    };

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        const uploadedImage = await Promise.all(
            files.map(async (file) => {
                return await uploadImage(file);
            })
        );
        setImage(uploadedImage[0]);
        onChange({
            'updatedIndicators': indicators,
            'image': image,
        });
    };

    // Trigger the file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Function to check if the new rectangle start position overlaps with an existing rectangle
    const isOverlapping = (x, y) => {
        return indicators.some(indicator => {
            const indicatorRight = indicator.x + indicator.width;
            const indicatorBottom = indicator.y + indicator.height;
            return (
                x >= indicator.x && x <= indicatorRight &&
                y >= indicator.y && y <= indicatorBottom
            );
        });
    };

    // Start dragging to create a rectangle
    const startDrag = (e) => {
        if (!canCreateRectangle) return;

        const rect = imageRef.current.getBoundingClientRect();
        const startX = (e.clientX - rect.left) / rect.width * 100; // Normalize to percentage
        const startY = (e.clientY - rect.top) / rect.height * 100; // Normalize to percentage

        // Check if the starting position is overlapping with an existing rectangle
        if (isOverlapping(startX, startY)) {
            return; // If overlapping, do nothing
        }

        setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setDragging(true);
        setCurrentRect(null); // Reset current rectangle when starting a new drag
        e.preventDefault(); // Prevent default dragging behavior
    };

    // Update rectangle dimensions while dragging
    const drag = (e) => {

        if (!dragging) return;
        const rect = imageRef.current.getBoundingClientRect();
        const width = e.clientX - rect.left - startPos.x;
        const height = e.clientY - rect.top - startPos.y;

        // When movement is detected, start the dragging process
        setDragging(true);

        setCurrentRect({
            x: startPos.x / rect.width * 100,
            y: startPos.y / rect.height * 100,
            width: (width / rect.width) * 100,
            height: (height / rect.height) * 100,
        });
        e.preventDefault(); // Prevent default dragging behavior
    };

    const endDrag = (e) => {
        if (!dragging || !imageRef.current || !currentRect) return;

        const rect = imageRef.current.getBoundingClientRect();
        const width = currentRect.width / 100 * rect.width;
        const height = currentRect.height / 100 * rect.height;

        // Check if both width and height are at least 30px, and at least one of them is greater than 50px
        if ((width < 30 || height < 30) || !(width > 50 || height > 50)) {
            setDragging(false); // Stop dragging
            setCurrentRect(null); // Clear the rectangle state
            return; // Do not create the rectangle
        }


        setDragging(false); // Stop dragging
        setCanCreateRectangle(false);

        const newIndicator = {
            id: indicators.length + 1,
            ...currentRect,
            type: 'image',
        };

        setIndicators([...indicators, newIndicator]);
        setCurrentRect(null); // Clear the rectangle state
        setSelectedIndicator(newIndicator.id);
        setModal({ x: e.clientX, y: e.clientY });
        setShowModal(true); // Open the modal for the new rectangle
    };


    // Open the modal for editing the indicator
    const openModal = (indicatorId, e) => {
        const indicator = indicators.find(i => i.id === indicatorId);
        setSelectedIndicator(indicatorId);
        setSelectedType(indicator.type);
        setModal({ x: e.clientX, y: e.clientY });
        setShowModal(true);
    };

    // Save the selected type for the indicator
    const saveIndicator = () => {
        const updatedIndicators = indicators.map(indicator =>
            indicator.id === selectedIndicator ? { ...indicator, type: selectedType } : indicator
        );
        setIndicators(updatedIndicators);
        setShowModal(false); // Close the modal
        onChange({
            'updatedIndicators': updatedIndicators,
            'image': image,
        }); // Notify parent of the changes
    };

    // Delete the selected indicator
    const deleteIndicator = () => {
        const updatedIndicators = indicators.filter(indicator => indicator.id !== selectedIndicator);
        setIndicators(updatedIndicators);
        setShowModal(false); // Close the modal
        onChange({
            'updatedIndicators': updatedIndicators,
            'image': image,
        }); // Notify parent of the changes
    };

    const togglecanCreateRectangle = () => {
        setCanCreateRectangle(!canCreateRectangle)
    }

    return (
        <div className="customizationAreaContainer">
            {/* Hidden file input */}
            <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef} // Ref for the input
                style={{ display: 'none' }} // Hide the actual input
            />

            {image ? (
                <div
                    className="imageContainer"
                    onDragStart={startDrag}
                    onMouseMove={drag}
                    onMouseUp={endDrag}
                >
                    <img
                        ref={imageRef}
                        src={image.url}
                        alt="Customization Preview"
                        className="customizationImage"
                        style={{ cursor: canCreateRectangle ? "crosshair" : "default" }}
                    />

                    {/* Render persistent rectangles */}
                    {indicators.map(indicator => (
                        <div
                            key={indicator.id}
                            className="rectangle"
                            style={{
                                top: `${indicator.y}%`,
                                left: `${indicator.x}%`,
                                width: `${indicator.width}%`,
                                height: `${indicator.height}%`,
                            }}
                            onClick={() => openModal(indicator.id, event)}
                        />
                    ))}

                    {/* Render the current rectangle while dragging */}
                    {currentRect && dragging && (
                        <div
                            className="rectangle"
                            style={{
                                top: `${currentRect.y}%`,
                                left: `${currentRect.x}%`,
                                width: `${currentRect.width}%`,
                                height: `${currentRect.height}%`,
                            }}
                        />
                    )}

                    <Button className="change_image_btn change_img" variant="secondary" onClick={triggerFileInput}>
                        Change image for customization
                    </Button>
                    <Button className="change_image_btn add_ractangle" onClick={togglecanCreateRectangle} variant={canCreateRectangle ? "primary" : "secondary"} >
                        {canCreateRectangle ? "Disable Rectangle Creation" : "Enable Rectangle Creation"}
                    </Button>

                </div>
            ) : (
                <Box padding={8} background="neutral100">
                    <EmptyStateLayout
                        icon={<PicturePlus style={{ width: '6rem' }} />}
                        content="You don't have any content yet..."
                        action={
                            <Button variant="secondary" startIcon={<Plus />} onClick={triggerFileInput}>
                                Add image for customization
                            </Button>
                        }
                    />
                </Box>
            )}

            {/* Custom modal for selecting type and actions */}
            {showModal && (
                <div className="custom-modal"
                    style={{
                        top: `${Modal.y}px`,
                        left: `${Modal.x}px`,
                    }}>
                    <Box padding={3}>
                        <RadioGroup value={selectedType} labelledBy="typeselection" name="typeselection" onChange={(e) => setSelectedType(e.target.value)}>
                            <Radio value="image" aria-checked="true">Image</Radio>
                            <Radio value="text">Text</Radio>
                        </RadioGroup>
                        <div className="modal-actions">
                            <Button onClick={saveIndicator}>Save</Button>
                            <Button variant="danger" onClick={deleteIndicator} startIcon={<Trash />}>
                                Delete
                            </Button>
                        </div>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default CustomizationArea;
