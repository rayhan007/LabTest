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
    public class ReporterPhotoController : ControllerBase
    {

        #region Private Variables

        private ReporterStoryService _reporterStoryService;
        //private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Documents\GradeManagement\GradeEntryRelated";


        #endregion

        #region Ctor

        //public ReporterPhotoController(_reporterStoryService ReporterStoryService)
        //{
        //    this._reporterPhotoService = ReporterStoryService;
        //}

        #endregion


       
        

    }
}
