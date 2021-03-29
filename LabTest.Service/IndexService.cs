
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
using LabTestWeb.Utilities;

namespace LabTest.Service.Story
{
    //public interface IReporterStoryService
    //{       
    //    Task<List<ReporterStory>> GetAllReporterStoryList();
    //    GlobalResponse<ReporterStoryModel> Add(ReporterStoryModel model);
    //    GlobalResponse<ReporterStoryModel> Edit(ReporterStoryModel model);
    //    ReporterStoryModel GetReporterStoryById(int id);
    //    GlobalResponse<ReporterStoryModel> Delete(int id);
    //}
    public class IndexService
    {
        private readonly LabTestContext db;
     
        ConversionUtility conversion = new ConversionUtility();
     

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

    }
}
