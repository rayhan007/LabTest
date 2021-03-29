using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace LabTestWeb.Utilities
{
    public class clsManager
    {
        static private string GetConnectionString()
        {
            // To avoid storing the connection string in your code,
            // you can retrieve it from a configuration file.
              return "Data Source=tcp:ajpdbsvr.database.windows.net,1433;initial catalog=uatenewsprodb;user id=ajpdba;password=AJp@2020";

            //return "Data Source=(local);initial catalog=enewsprodb;user id=sa;password=123";
        }
        public DataSet ReporterDataset(string query)
        {
            DataSet ds = new DataSet();
            string connectionString = GetConnectionString();
            {
                using (SqlConnection myConnection = new SqlConnection(connectionString))
                {
                    SqlDataAdapter sda = new SqlDataAdapter(query, myConnection);
                    sda.Fill(ds, "Result");
                    myConnection.Close();
                    return ds;
                }
            }
        }
        public DataSet ReturnDatasetReport(string query)
        {
            DataSet ds = new DataSet();
            string connectionString = GetConnectionString();
            {
                using (SqlConnection myConnection = new SqlConnection(connectionString))
                {
                    SqlDataAdapter sda = new SqlDataAdapter(query, myConnection);
                    sda.Fill(ds, "Result");
                    myConnection.Close();
                    return ds;
                }
            }
        }

        public DataRow ReturnDataRow(string query)
        {
            DataSet ds = new DataSet();
            string connectionString = GetConnectionString();
            {
                using (SqlConnection myConnection = new SqlConnection(connectionString))
                {
                    SqlDataAdapter sda = new SqlDataAdapter(query, myConnection);
                    sda.Fill(ds, "Result");
                    myConnection.Close();
                    return ds.Tables[0].Rows[0];
                }
            }
        }

        public System.Data.Common.DbCommand GetStoredProcCommand(string p)
        {
            throw new NotImplementedException();
        }

        public DataSet ExecuteDataSet(System.Data.Common.DbCommand cmd)
        {
            throw new NotImplementedException();
        }



    }
}
