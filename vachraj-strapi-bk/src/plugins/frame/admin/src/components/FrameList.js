import React, { useEffect, useState } from 'react';
import { Button, LinkButton, IconButton, Table, Thead, Tbody, Tr, Th, Td, EmptyStateLayout, BaseHeaderLayout, ContentLayout, Layout } from '@strapi/design-system';
import { Pencil, Plus, PicturePlus, Trash } from '@strapi/icons';
import { Link } from 'react-router-dom';
import pluginId from '../pluginId';

import axios from 'axios';

const FrameListView = () => {
  const [frames, setFrames] = useState([]);


  const fetchFrames = async () => {
    try {
      const response = await axios.get('/frame/product/');
      setFrames(response.data);
    } catch (error) {
      console.error('Failed to fetch frames', error);
    }
  };

  useEffect(() => {
    fetchFrames();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this frame?')) {
      try {
        await axios.delete(`/frame/product/delete/${id}`);

        setFrames((prevFrames) => prevFrames.filter((frame) => frame.id !== id));
      } catch (error) {
        console.error('Failed to delete frame', error);
      }
    }
  };

  return (
    <Layout sideNav={null}>
      <BaseHeaderLayout
        title="Frames"
        subtitle={`${frames.length} frames found`}
        as="h2"
        primaryAction={
          <Link
            to={`/plugins/${pluginId}/create-frame`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              style={{ display: 'flex', alignItems: 'center' }}
              startIcon={<Plus />}
            >
              Create a New Frame
            </Button>
          </Link>
        }
      />
      <ContentLayout>
        {frames.length > 0 ? (
          <Table footer={null}>
            <Thead>
              <Tr>
                <Th action={undefined}>Frame Name</Th>
                <Th action={undefined}>Category</Th>
                <Th action={undefined}>Sizes</Th>
                <Th action={undefined}>Created At</Th>
                <Th action={undefined}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {frames.map((frame) => (
                <Tr key={frame.id}>
                  <Td>{frame.name}</Td>
                  <Td>{frame.category.map((cat) => cat.name).join(', ')}</Td>
                  <Td>{frame.sizes.map((size) => size.name).join(', ')}</Td>
                  <Td>
                    {new Date(frame.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })},{' '}
                    {new Date(frame.createdAt).toLocaleDateString('en-GB')}
                  </Td>

                  <Td>
                    <Link
                      to={`/plugins/${pluginId}/edit-frame/${frame.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="secondary" startIcon={<Pencil />} />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <EmptyStateLayout
            icon={<PicturePlus style={{ width: '6rem' }} />}
            content="No frames found"
            action={
              <Link
                to={`/plugins/${pluginId}/create-frame`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  style={{ display: 'flex', alignItems: 'center' }}
                  startIcon={<Plus />}
                >
                  Create a New Frame
                </Button>
              </Link>
            }
            hasRadius={true}
            shadow="popupShadow"
          />
        )}
      </ContentLayout>
    </Layout>
  );
};

export default FrameListView;
