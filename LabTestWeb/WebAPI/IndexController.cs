using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using LabTest.Data.DomainModels;
using LabTest.Data.Models;
using LabTest.Data.ViewModels;

using LabTest.Service.Story;
using LabTest.Service.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Options;


namespace LabTestWeb.WebAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndexController : ControllerBase
    {

        #region Private Variables

        private IndexService _indexService;
        //private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Documents\GradeManagement\GradeEntryRelated";


        #endregion

        #region Ctor

        public IndexController( IndexService indexService)
        {
            this._indexService = indexService;
        }
      
        [HttpGet]
        [Route("GetBuilding")]
        public async Task<List<Building>> GetBuilding()
        {

            var List = new List<Building>();
            try
            {
                List = await _indexService.GetBuilding();
            }
            catch (Exception ex)
            {
                new List<Building>();
            }
            return List;
        }

        [HttpGet]
        [Route("GetMyObjects")]
        public async Task<List<MyObject>> GetMyObjects()
        {

            var List = new List<MyObject>();
            try
            {
                List = await _indexService.GetMyObjects();
            }
            catch (Exception ex)
            {
                new List<MyObject>();
            }
            return List;
        }

        [HttpGet]
        [Route("GetDataFields")]
        public async Task<List<DataField>> GetDataFields()
        {

            var List = new List<DataField>();
            try
            {
                List = await _indexService.GetDataFields();
            }
            catch (Exception ex)
            {
                new List<Building>();
            }
            return List;
        }

        [HttpGet]
        [Route("GetSearchList")]      
        public async Task<List<Reading>> GetSearchList(string buildingid, string timestampfrom, string timestampto, string objectid, string datafieldid)
        {
           
            var List = new List<Reading>();
            try
            {
                List = await _indexService.GetSearchResults(buildingid, timestampfrom, timestampto, objectid, datafieldid);
            }
            catch (Exception ex)
            {
                new List<Reading>();
            }
            return List;
        }




        #endregion





    }
}
