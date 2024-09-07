import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
    Tag,
    Field,
    FieldLabel,
    FieldHint,
    FieldError,
    Flex,
} from '@strapi/design-system'
import { Cross } from '@strapi/icons'
import { ReactSelect } from '@strapi/helper-plugin'

import { useIntl } from 'react-intl'
import styled from 'styled-components'

const CustomMultiValueContainer = (props) => {
    const { selectProps } = props
    const handleTagClick = (value) => (e) => {
        e.preventDefault()
        selectProps.onChange(selectProps.value.filter((v) => v.value !== value))
    }
    return (
        <Tag
            type="button"
            tabIndex={-1}
            icon={<Cross />}
            onClick={handleTagClick(props.data.value)}>
            {props.data.label}
        </Tag>
    )
}

const StyleSelect = styled(ReactSelect)`
  .select-control {
    height: auto;

    & > div:first-child {
      padding: 4px;
      gap: 4px;

      & > div {
        padding-left: 8px;
      }
    }

    .select-multi-value-container {
      margin-right: -8px;
    }
  }
`

const MultiSelect = ({
    value,
    onChange,
    name,
    label,
    required,
    attribute,
    description,
    placeholder,
    disabled,
    error,
}) => {
    const { formatMessage } = useIntl()

    // Map the available options from the `attribute` prop
    const possibleOptions = useMemo(() => {
        return attribute.map((option) => ({
            label: option.name, // `name` field from the category object
            value: option.id,   // `id` field from the category object
        }))
    }, [attribute])

    // Map the selected values from the `value` prop to the format the ReactSelect expects
    const sanitizedValue = useMemo(() => {
        return value.map((selected) => ({
            label: selected.name, // `name` field from the selected object
            value: selected.id,   // `id` field from the selected object
        }))
    }, [value])

    const fieldError = useMemo(() => {
        return error || (required && !possibleOptions.length ? 'No options' : null)
    }, [required, error, possibleOptions])

    return (
        <Field
            hint={description && formatMessage(description)}
            error={fieldError}
            name={name}
            required={required}>
            <Flex direction="column" alignItems="stretch" gap={1}>
                <FieldLabel>{label}</FieldLabel>
                <StyleSelect
                    isSearchable
                    isMulti
                    error={fieldError}
                    name={name}
                    id={name}
                    disabled={disabled || possibleOptions.length === 0}
                    placeholder={placeholder}
                    value={sanitizedValue}
                    components={{
                        MultiValueContainer: CustomMultiValueContainer,
                    }}
                    options={possibleOptions}
                    onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map((option) => ({
                            id: option.value,
                            name: option.label,
                        }))
                        onChange(selectedValues)
                    }}
                    classNames={{
                        control: (_state) => 'select-control',
                        multiValue: (_state) => 'select-multi-value',
                        placeholder: (_state) => 'select-placeholder',
                    }}
                />
                <FieldHint />
                <FieldError />
            </Flex>
        </Field>
    )
}

MultiSelect.defaultProps = {
    description: null,
    disabled: false,
    error: null,
    labelAction: null,
    required: false,
    value: [],
}

MultiSelect.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    attribute: PropTypes.array.isRequired,  // Available options must be an array of objects
    name: PropTypes.string.isRequired,
    description: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    labelAction: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.array,  // Selected values must be an array of objects
}

export default MultiSelect
