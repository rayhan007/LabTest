
using LabTest.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LabTest.Data.Models;
using Microsoft.EntityFrameworkCore;
using LabTest.Data.DomainModels;
using System.Globalization;

using Microsoft.Extensions.Configuration;
using System.Data;
using LabTest.Service.Utilities;


namespace LabTest.Service.Story
{
   
    public class IndexService
    {
        private readonly LabTestContext db;

      


        public IndexService(LabTestContext db)
        {
            this.db = db;

        }


        public GlobalResponse<ReadingModel> Add(ReadingModel model)
        {


            var response = new GlobalResponse<ReadingModel>();
            try
            {

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = $"Error, {ex.Message}";

            }


            return response;
        }
        public async Task<List<Building>> GetBuilding()
        {

            var list = new List<Building>();
            try
            {
                list = await db.Buildings.ToListAsync();

            }
            catch (Exception ex)
            {
                list = new List<Building>();
            }

            return list;
        }
        public async Task<List<MyObject>> GetMyObjects()
        {

            var list = new List<MyObject>();
            try
            {
                list = await db.MyObjects.ToListAsync();

            }
            catch (Exception ex)
            {
                list = new List<MyObject>();
            }

            return list;
        }

        public async Task<List<DataField>> GetDataFields()
        {

            var list = new List<DataField>();
            try
            {
                list = await db.DataFields.ToListAsync();

            }
            catch (Exception ex)
            {
                list = new List<DataField>();
            }

            return list;
        }

        public async Task<List<Reading>> GetSearchResults(string buildingid, string timestampfrom, string timestampto, string objectid, string datafieldid)
        {

            var list = new List<Reading>();
            try
            {
                var query = "";

                if (objectid == "null"|| objectid=="undefined")
                {
                    objectid = "";
                }
                if (datafieldid == "null" || datafieldid == "undefined")
                {
                    datafieldid = "";
                }
                if (buildingid == "null" || buildingid == "undefined")
                {
                    buildingid = "";
                }

                query = $@" select * from Reading Where Timestamp between '" + timestampfrom + "' and '" + timestampto + "' and BuildingId like '%" + buildingid + "%' and ObjectId like '%" + objectid + "%' and DatafieldId like '%" + datafieldid + "%' ";

                list = await db.Readings.FromSqlRaw(query).ToListAsync();


                return list;
            }

            catch (Exception ex)
            {
                return list;
            }
        }

    }
}
