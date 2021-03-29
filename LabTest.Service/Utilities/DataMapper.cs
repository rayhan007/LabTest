using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace LabTest.Service.Utilities
{
    public static class DataMapper
    {
        /// <summary>
        /// Sets an object's property with the specified value,
        /// coercing that value to the appropriate type if possible.
        /// </summary>
        /// <param name="target">Object containing the property to set.</param>
        /// <param name="propertyName">Name of the property to set.</param>
        /// <param name="value">Value to set into the property.</param>
        public static void SetPropertyValue(object target, string propertyName, object value)
        {
            try
            {
                PropertyInfo propertyInfo =
                    target.GetType().GetProperty(propertyName);
                if (value == null)
                    propertyInfo.SetValue(target, value, null);
                else
                {
                    Type pType =
                        GetPropertyType(propertyInfo.PropertyType);
                    Type vType =
                        GetPropertyType(value.GetType());
                    if (pType.Equals(vType))
                    {
                        // types match, just copy value
                        propertyInfo.SetValue(target, value, null);
                    }
                    else
                    {
                        // types don't match, try to coerce
                        if (pType.Equals(typeof(Guid)))
                            propertyInfo.SetValue(
                                target, new Guid(value.ToString()), null);
                        else if (pType.IsEnum && vType.Equals(typeof(string)))
                            propertyInfo.SetValue(target, System.Enum.Parse(pType, value.ToString()), null);
                        else
                            propertyInfo.SetValue(
                                target, Convert.ChangeType(value, pType), null);
                    }
                }
            }
            catch
            {
            }
        }

        public static PropertyInfo[] GetSourceProperties(Type sourceType)
        {

            List<PropertyInfo> result = new List<PropertyInfo>();
            try
            {
                PropertyDescriptorCollection props =
                TypeDescriptor.GetProperties(sourceType);
                foreach (PropertyDescriptor item in props)
                    if (item.IsBrowsable)
                        result.Add(sourceType.GetProperty(item.Name));
            }
            catch
            {
                return null;
            }
            return result.ToArray();
        }
        public static PropertyInfo[] GetSourcePropertiesGetAndSet(Type sourceType)
        {
            List<PropertyInfo> result = new List<PropertyInfo>();
            try
            {
                PropertyDescriptorCollection props = TypeDescriptor.GetProperties(sourceType);
                foreach (PropertyDescriptor item in props)
                    if (item.IsBrowsable && !item.IsReadOnly)
                        result.Add(sourceType.GetProperty(item.Name));
            }
            catch
            {
            }
            return result.ToArray();
        }
        public static List<PropertyInfo> GetEntityProperty<T>()
        {
            List<PropertyInfo> props = new List<PropertyInfo>(DataMapper.GetSourcePropertiesGetAndSet(typeof(T)));
            return props;
        }
        /// <summary>
        /// Returns a property's type, dealing with
        /// Nullable(Of T) if necessary.
        /// </summary>
        /// <param name="propertyType">Type of the
        /// property as returned by reflection.</param>
        private static Type GetPropertyType(Type propertyType)
        {
            Type type = propertyType;
            if (type.IsGenericType &&
                (type.GetGenericTypeDefinition() == typeof(Nullable<>)))
                return Nullable.GetUnderlyingType(type);
            return type;
        }
    }
}
