export type AttributeFieldType = "text" | "number" | "checkbox" | "date"

export interface IMachineField {
  machine_field_id: string
  category_attribute_id: string
  value: string | number | boolean
}

export interface IMachine {
  category_id: string
  machine_id: string
  machine_fields: IMachineField[]
}

export interface IAttribute {
  field_name: string
  type: AttributeFieldType
  attribute_field_id: string
}

export interface ICategory {
  category_id: string
  category_name: string
  attributes: IAttribute[]
  machine_field_title: string
}

export interface IMachines {
  machines: IMachine[]
}

export interface ICategories {
  categories: ICategory[]
}
