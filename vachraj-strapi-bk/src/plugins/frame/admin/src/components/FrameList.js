import React, { useEffect, useState } from 'react';
import { Pencil, Plus, PicturePlus, Trash, ArrowLeft } from '@strapi/icons';
import { Link } from 'react-router-dom';
import pluginId from '../pluginId';
import {
  Main,
  ActionLayout,
  Button,
  ContentLayout,
  HeaderLayout,
  Td,
  Tr,
  Table,
  Thead,
  Tbody,
  Th,
  EmptyStateLayout,
} from '@strapi/design-system';
import {
  SearchURLQuery,
  Link as StrapiLink,
  useQueryParams
} from '@strapi/helper-plugin';
import buildParams from '../utils/buildValidGetParams'

import axios from 'axios';

const FrameListView = () => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [{ query }] = useQueryParams();

  const params = React.useMemo(() => buildParams(query), [query]);

  const fetchFrames = async () => {
    try {
      const response = await axios.get('/frame/product/', { params });
      setFrames(response.data);
      setIsLoading(true);
    } catch (error) {
      console.error('Failed to fetch frames', error);
    }
  };

  useEffect(() => {
    fetchFrames();
  }, [query]);


  return (
    <Main aria-busy={isLoading}>
      <HeaderLayout
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
        subtitle={`${frames.length} frames found`}
        title="Product"
        navigationAction={
          <StrapiLink startIcon={<ArrowLeft />} to="/plugins/frame/">
            Back
          </StrapiLink>
        }
      />
      <ActionLayout
        startActions={
          <SearchURLQuery
            label="Search for product"
            placeholder="Search"
          />
        }
        endActions={<></>}
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
                      <Button variant="secondary" startIcon={<Pencil />}>Edit</Button>

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
    </Main>
  );
};

export default FrameListView;
function buildValidGetParams(query) {
  throw new Error('Function not implemented.');
}

