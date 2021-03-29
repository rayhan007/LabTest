using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;

namespace LabTest.Service.Utilities
{
    /// <summary>
    /// Class that manages all lower level ADO.NET data base access.
    /// I have only implemented what I needed; not all posible functionality 
    /// for the best Db helper in this universe:-)
    /// 
    /// GoF Design Patterns: Singleton, Factory, Proxy.
    /// </summary>
    /// <remarks>
    /// This class is a 'swiss army knife' of data access. It handles all the 
    /// database access details and shields its complexity from its clients.
    /// 
    /// The Factory Design pattern is used to create database specific instances
    /// of Connection objects, Command objects, etc.
    /// 
    /// This class is like a Singleton -- it is a static class (Shared in VB) and 
    /// therefore only one 'instance' ever will exist.
    /// 
    /// This class is a Proxy in that it 'stands in' for the actual DbProviderFactory.
    /// </remarks>
    public static class MapperExtra
    {
        //private static readonly string dataProvider = ConfigurationManager.ConnectionStrings["BVSchoolSqlConnection"].ProviderName;

        //private static readonly DbProviderFactory factory = DbProviderFactories.GetFactory(dataProvider);

        //private static readonly string connectionString = ConfigurationManager.ConnectionStrings["BVSchoolSqlConnection"].ConnectionString;

        //public static string ConnectionString
        //{
        //    get { return connectionString; }
        //}

        #region parameters

        //public static DbParameter CreateParameter(string ParameterName, DbType ParameterType, int ParameterSize)
        //{
        //    DbParameter p = factory.CreateParameter();
        //    p.ParameterName = ParameterName;
        //    p.DbType = ParameterType;
        //    p.Size = ParameterSize;
        //    return p;
        //}

        //public static DbParameter CreateParameter(string ParameterName, object ParameterValue)
        //{
        //    DbParameter p = factory.CreateParameter();
        //    p.ParameterName = ParameterName;
        //    p.Value = ParameterValue;
        //    return p;
        //}

        //public static DbParameter CreateParameter(string ParameterName)
        //{
        //    DbParameter p = factory.CreateParameter();
        //    p.ParameterName = ParameterName;
        //    return p;
        //}

        #endregion

        #region Command Handlers

        /// <summary>
        /// 
        /// </summary>        
        //public static DbCommand CreateCommand(string sql, CommandType CommandType, string conString, params DbParameter[] Parameters)
        //{
        //    DbConnection connection = factory.CreateConnection();
        //    connection.ConnectionString = ConfigurationManager.ConnectionStrings[conString].ConnectionString;

        //    DbCommand command = factory.CreateCommand();
        //    command.Connection = connection;
        //    command.CommandType = CommandType;
        //    command.CommandText = sql;
        //    command.Parameters.AddRange(Parameters);

        //    return command;
        //}

        /// <summary>
        /// Executes a Sql statement and returns a scalar value.
        /// </summary>
        /// <param name="sql">Sql statement.</param>
        /// <returns>Scalar value.</returns>
        /// <param name="Parameters"></param>  
        //public static object ExecuteScalar(string sql, CommandType CommandType, string conString, params DbParameter[] Parameters)
        //{
        //    DbConnection connection = factory.CreateConnection();
        //    connection.ConnectionString = ConfigurationManager.ConnectionStrings[conString].ConnectionString;
        //    connection.Open();

        //    DbCommand command = factory.CreateCommand();
        //    command.Connection = connection;
        //    command.CommandType = CommandType;
        //    command.CommandText = sql;
        //    command.Parameters.AddRange(Parameters);

        //    object retval = command.ExecuteScalar();
        //    connection.Close();
        //    return retval;
        //}

        /// <summary>
        /// Executes a Sql statement and returns rows affected
        /// </summary>
        /// <param name="sql">Sql statement.</param>
        /// <returns>Scalar value.</returns>        
        /// <param name="Parameters"></param>      
        //public static int ExecuteNonQuery(string sql, CommandType CommandType, string conString, params DbParameter[] Parameters)
        //{
        //    DbConnection connection = factory.CreateConnection();
        //    connection.ConnectionString = ConfigurationManager.ConnectionStrings[conString].ConnectionString;
        //    connection.Open();

        //    DbCommand command = factory.CreateCommand();
        //    command.Connection = connection;
        //    command.CommandType = CommandType;
        //    command.CommandText = sql;
        //    command.Parameters.AddRange(Parameters);

        //    int retval = command.ExecuteNonQuery();
        //    connection.Close();
        //    return retval;
        //}

        /// <summary>
        /// Populates a DataReader according to a Sql statement.
        /// </summary>
        /// <param name="sql">Sql statement.</param>
        /// <returns>Populated DataReader.</returns>        
        /// <param name="Parameters"></param>
        //public static IDataReader ExecuteReader(string sql, CommandType CommandType, string conString, params DbParameter[] Parameters)
        //{
        //    DbConnection connection = factory.CreateConnection();
        //    connection.ConnectionString = ConfigurationManager.ConnectionStrings[conString].ConnectionString;
        //    connection.Open();

        //    DbCommand command = factory.CreateCommand();
        //    command.Connection = connection;
        //    command.CommandType = CommandType;
        //    command.CommandText = sql;
        //    command.Parameters.AddRange(Parameters);

        //    return command.ExecuteReader(CommandBehavior.CloseConnection);
        //}
        #endregion

        #region relational-object mapping

        public static TTarget Map<TTarget>(IDataReader reader) where TTarget : new()
        {
            IList<TTarget> list = MapReader<TTarget>(reader);
            return list.Count > 0 ? list[0] : default(TTarget);
        }

        //public static TTarget Map<TTarget>(string sql, CommandType CommandType, string conString,
        //                                   params DbParameter[] Parameters) where TTarget : new()
        //{
        //    IList<TTarget> list = MapReader<TTarget>(sql, CommandType.StoredProcedure, conString, Parameters);
        //    return list.Count > 0 ? list[0] : default(TTarget);
        //}

        public static IList<TTarget> MapReader<TTarget>(IDataReader reader) where TTarget : new()
        {
            ValidateMappings<TTarget>(reader);

            IList<TTarget> list = new List<TTarget>();
            while (reader.Read())
            {
                TTarget obj = new TTarget();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    if (reader.GetValue(i) != DBNull.Value)
                    {
                        DataMapper.SetPropertyValue(obj, reader.GetName(i), reader.GetValue(i));
                    }
                }
                list.Add(obj);
            }
            reader.Close();
            return list;
        }

        //public static IList<TTarget> MapReader<TTarget>(string sql, CommandType CommandType, string conString,
        //                                                params DbParameter[] Parameters) where TTarget : new()
        //{
        //    IDataReader reader = ExecuteReader(sql, CommandType.StoredProcedure, conString, Parameters);

        //    ValidateMappings<TTarget>(reader);

        //    IList<TTarget> list = new List<TTarget>();
        //    while (reader.Read())
        //    {
        //        TTarget obj = new TTarget();
        //        for (int i = 0; i < reader.FieldCount; i++)
        //        {
        //            if (reader.GetValue(i) != DBNull.Value)
        //            {
        //                DataMapper.SetPropertyValue(obj, reader.GetName(i), reader.GetValue(i));
        //            }
        //        }
        //        list.Add(obj);
        //    }
        //    reader.Close();
        //    return list;
        //}
        /// <summary>
        /// Map one object to another
        /// </summary>
        /// <typeparam name="TTarget">Target Class</typeparam>
        /// <typeparam name="TBase">Base Class</typeparam>
        /// <param name="entity">Base Class object</param>
        /// <returns></returns>
        public static TTarget MapEntity<TTarget, TBase>(TBase entity) where TTarget : new()
        {
            if (entity == null)
                return default(TTarget);

            IList<TBase> baselist = new List<TBase>();
            baselist.Add(entity);
            IList<TTarget> list = MapEntities<TTarget, TBase>(baselist);
            return list.Count > 0 ? list[0] : default(TTarget);
        }

        public static IList<TTarget> MapEntities<TTarget, TBase>(IList<TBase> entities) where TTarget : new()
        {
            IList<TTarget> list = new List<TTarget>();
            try
            {
                if (entities == null || entities.Count == 0)
                    return default(IList<TTarget>); ;

                TBase entity = entities[0];
                ValidateMappings<TTarget, TBase>(entity);
                List<PropertyInfo> baseprops = new List<PropertyInfo>(DataMapper.GetSourceProperties(typeof(TBase)));


                for (int i = 0; i < entities.Count; i++)
                {
                    TTarget obj = new TTarget();
                    foreach (PropertyInfo propsInfo in baseprops)
                    {
                        DataMapper.SetPropertyValue(obj, propsInfo.Name, propsInfo.GetValue(entities[i], null));
                    }
                    list.Add(obj);
                }

            }
            catch
            {
            }
            return list;
        }

        private static bool ValidateMappings<TTarget, TBase>(TBase entity)
        {

            try
            {
                List<PropertyInfo> props = new List<PropertyInfo>(DataMapper.GetSourceProperties(typeof(TTarget)));
                List<PropertyInfo> baseprops = new List<PropertyInfo>(DataMapper.GetSourceProperties(typeof(TBase)));

                foreach (PropertyInfo propInfo in baseprops)
                {
                    PropertyInfo propinfo = props.Find(
                       delegate(PropertyInfo pi) { return pi.Name == propInfo.Name ? true : false; });
                    //if (propinfo == null)
                    //{
                    //    string err = string.Format("Property '{0}' of type '{1}' is missing from the type '{2}'",
                    //                               propInfo.Name, propInfo.PropertyType, typeof(TTarget).FullName);
                    //    throw new Exception(err);
                    //}
                }
            }
            catch
            {
            }

            return true;

        }

        private static void ValidateMappings<TTarget>(IDataRecord reader)
        {
            List<PropertyInfo> props = new List<PropertyInfo>(DataMapper.GetSourceProperties(typeof(TTarget)));
            for (int i = 0; i < reader.FieldCount; i++)
            {
                PropertyInfo propinfo = props.Find(
                    delegate(PropertyInfo pi) { return pi.Name == reader.GetName(i) ? true : false; });
                if (propinfo == null)
                {
                    string err = string.Format("Property '{0}' of type '{1}' is missing from the type '{2}'",
                                               reader.GetName(i), reader.GetFieldType(i), typeof(TTarget).FullName);
                    throw new Exception(err);
                }
            }
        }
        #endregion

        #region Utility methods

        /// <summary>
        /// Escapes an input string for database processing, that is, 
        /// surround it with quotes and change any quote in the string to 
        /// two adjacent quotes (i.e. escape it). 
        /// If input string is null or empty a NULL string is returned.
        /// </summary>
        /// <param name="s">Input string.</param>
        /// <returns>Escaped output string.</returns>
        public static string Escape(string s)
        {
            if (String.IsNullOrEmpty(s))
                return "NULL";
            else
                return "'" + s.Trim().Replace("'", "''") + "'";
        }

        /// <summary>
        /// Escapes an input string for database processing, that is, 
        /// surround it with quotes and change any quote in the string to 
        /// two adjacent quotes (i.e. escape it). 
        /// Also trims string at a given maximum length.
        /// If input string is null or empty a NULL string is returned.
        /// </summary>
        /// <param name="s">Input string.</param>
        /// <param name="maxLength">Maximum length of output string.</param>
        /// <returns>Escaped output string.</returns>
        public static string Escape(string s, int maxLength)
        {
            if (String.IsNullOrEmpty(s))
                return "NULL";
            else
            {
                s = s.Trim();
                if (s.Length > maxLength) s = s.Substring(0, maxLength - 1);
                return "'" + s.Trim().Replace("'", "''") + "'";
            }
        }

        #endregion
    }
}
