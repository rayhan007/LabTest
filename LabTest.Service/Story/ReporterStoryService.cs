
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
    public class ReporterStoryService
    {
        private readonly eSenderContext db;
     
        ConversionUtility conversion = new ConversionUtility();
        private IConfiguration Configuration;
        public ReporterStoryService(eSenderContext db, IConfiguration _configuration)
        {
            this.db = db;
            this.Configuration = _configuration;
        }

        public async Task<List<ReporterStory>> GetAllReporterStoryList(int currentLoggedInCourseId)
        {

            var list = new List<ReporterStory>();
            try
            {
                list = await db.ReporterStories.Where(f => f.Status == 2 && f.EntryBy== currentLoggedInCourseId).ToListAsync();
            }
            catch (Exception ex)
            {
                list = new List<ReporterStory>();
            }

            return list;
        }

        public async Task<List<ReporterStory>> GetAllReporterMyStoryList(int currentLoggedInCourseId)
        {
          
            var list = new List<ReporterStory>();
            try
            {
                list = await db.ReporterStories.Where(f => f.Status == 1 && f.EntryBy== currentLoggedInCourseId).OrderByDescending(f=>f.EntryDate).ToListAsync();
            }
            catch (Exception ex)
            {
                list = new List<ReporterStory>();
            }

            return list;
        }
        public async Task<List<ReporterStory>> GetReporterStorySearchList(string ReporterStoryHeadingSearch, string fromdate, string to,int currentLoggedInCourseId)
        {
            var list = new List<ReporterStory>();
            try
            {
               
                var query = "";

                if (fromdate != "" &&fromdate != null &&fromdate != "undefined")
                {
                    fromdate = conversion.DateToStringInSql(DateTime.Parse(fromdate.ToString()));
                }
                else
                {
                    fromdate = conversion.DateToStringInSql(DateTime.Parse("01/01/2021"));

                }
                if (to != "" && to != null && to != "undefined")
                {
                    to = conversion.DateToStringInSql(DateTime.Parse(to.ToString()));
                }
                else
                {
                    to = conversion.DateToStringInSql(DateTime.Parse(DateTime.Now.ToShortDateString()));
                  

                }
                if (ReporterStoryHeadingSearch == "undefined")
                {
                    ReporterStoryHeadingSearch = "";
                }
               
                query = $@" select * from ReporterStory  Where ReporterStoryDate between '" + fromdate + "' and '" + to + "'  and ReporterStoryHeading like N'%" + ReporterStoryHeadingSearch + "%' and Status=1 and EntryBy=" + currentLoggedInCourseId + " ";

                list = await db.ReporterStories.FromSqlRaw(query).ToListAsync();


                return list;
            }

            catch (Exception ex)
            {
                return list;
            }
           
        }

        public async Task<List<ReporterStory>> GetReporterStoryTagSearchList(string ReporterStoryHeadingSearch, string fromdate, string to, string reporterStoryTag, int currentLoggedInCourseId)
        {
            var list = new List<ReporterStory>();
            try
            {

                var query = "";

                if (fromdate != "undefined")
                {
                    fromdate = conversion.DateToStringInSql(DateTime.Parse(fromdate.ToString()));
                }
                else
                {
                    fromdate = conversion.DateToStringInSql(DateTime.Parse("01/01/2021"));

                }
                if (to != "undefined")
                {
                    to = conversion.DateToStringInSql(DateTime.Parse(to.ToString()));
                }
                else
                {
                    to = conversion.DateToStringInSql(DateTime.Parse(DateTime.Now.ToShortDateString()));


                }
                if (ReporterStoryHeadingSearch == "undefined")
                {
                    ReporterStoryHeadingSearch = "";
                }
                if (reporterStoryTag == "undefined")
                {
                    reporterStoryTag = "";
                }



                query = $@" select * from ReporterStory  Where ReporterStoryDate between '" + fromdate + "' and '" + to + "'  and ReporterStoryHeading like N'%" + ReporterStoryHeadingSearch + "%'  and Tag like N'%" + reporterStoryTag + "%' and Status=2 and EntryBy=" + currentLoggedInCourseId + "";

                list = await db.ReporterStories.FromSqlRaw(query).ToListAsync();


                return list;
            }

            catch (Exception ex)
            {
                return list;
            }
        }


        public GlobalResponse<ReporterStoryModel> Add(ReporterStoryModel model)
        {
          

            var response = new GlobalResponse<ReporterStoryModel>();
            try
            {
                String  Date = conversion.DateToStringInSql(DateTime.Now);
                int CountReporterheader = 0;
                clsManager manager = new clsManager();
                DataSet ds = new DataSet();
                ds = manager.ReporterDataset("select Count(*) from ReporterStory where ReporterStoryDate ='" + Date + "' and EntryBy="+model.EntryBy+"   and ReporterStoryHeading = N'" + model.ReporterStoryHeading + "'  ");
                CountReporterheader = int.Parse(ds.Tables[0].Rows[0][0].ToString());

                //var Reporterstorycount = db.ReporterStories.Where(f => f.ReporterStoryHeading == model.ReporterStoryHeading && f.ReporterStoryDate == DateTime.Now).Count();
                int tagcount = 0;
                string[] tagstring = model.Tag.Split(',').ToArray();
                foreach (string tag in tagstring)
                {
                    if (!string.IsNullOrEmpty(tag))
                    {
                        tagcount = tagcount + 1;
                    }

                }

                if (tagcount > 1 && CountReporterheader==0)
                {

                    var newobj = MapperExtra.MapEntity<ReporterStoryModel, ReporterStory>(model);

                    // newobj.CreatedBy = Convert.ToInt32(HttpContent.Session["UserId"].ToString());
                    newobj.EntryDate = DateTime.Now;
                    newobj.ReporterStoryDate = DateTime.Now;
                    newobj.SentFrom = "Web";
                    newobj.Status = 1;
                    newobj.ReporterStoryType = model.ReporterStoryType;
                    int a = 0, myWord = 1;

                    while (a <= model.ReporterStoryBody.Length - 1)
                    {
                        if (model.ReporterStoryBody[a] == ' ' || model.ReporterStoryBody[a] == '\n' || model.ReporterStoryBody[a] == '\t')
                        {
                            myWord++;
                        }
                        a++;
                    }
                    newobj.ReporterStoryWord = myWord;
                    newobj.SyncStatus = 1;
                    db.ReporterStories.Add(newobj);
                    db.SaveChanges();
                    //ReporterStoryId = newobj.ReporterStoryId;
                    model.ReporterStoryId = newobj.ReporterStoryId;
                    model.ReporterStoryHeading = newobj.ReporterStoryHeading;

                    response.Result = model;
                    response.IsSuccess = true;
                    response.Message = $"Success, Reporter Story Created";
                }
                else {
                    if (tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, Please Enter more than one tag with comma";
                    }
                    if (CountReporterheader> 0)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today";
                    }
                    //if (CountReporterheader > 0 && tagstring.Count() < 2)
                    //{

                    //    response.IsSuccess = false;
                    //    response.Message = $"Warning, This heading already saved today,Please Enter more than one tag with comma";
                    //}


                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = $"Error, {ex.Message}";
              
            }
          

            return response;
        }
        public GlobalResponse<ReporterStoryModel> Submit(ReporterStoryModel model)
        {
            String Date = conversion.DateToStringInSql(DateTime.Now);
            int CountReporterheader = 0;
            clsManager manager = new clsManager();
            DataSet ds = new DataSet();
            ds = manager.ReporterDataset("select Count(*) from ReporterStory where ReporterStoryDate ='" + Date + "' and EntryBy="+model.EntryBy+"   and ReporterStoryHeading = N'" + model.ReporterStoryHeading + "'  ");

            CountReporterheader = int.Parse(ds.Tables[0].Rows[0][0].ToString());

            int tagcount = 0;
            string[] tagstring = model.Tag.Split(',').ToArray();
            foreach (string tag in tagstring)
            {
                if(!string.IsNullOrEmpty(tag))
                {
                    tagcount = tagcount + 1;
                }
                
            }

            var response = new GlobalResponse<ReporterStoryModel>();
            try
            {
                
                if (tagcount > 1 && CountReporterheader==0)
                {
                    var newobj = MapperExtra.MapEntity<ReporterStoryModel, ReporterStory>(model);

                    // newobj.CreatedBy = Convert.ToInt32(HttpContent.Session["UserId"].ToString());
                    newobj.EntryDate = DateTime.Now;
                    newobj.ReporterStoryDate = DateTime.Now;
                    newobj.SentFrom = "Web";
                    newobj.Status = 2;
                    newobj.ReporterStoryType = model.ReporterStoryType;
                    int a = 0, myWord = 1;

                    while (a <= model.ReporterStoryBody.Length - 1)
                    {
                        if (model.ReporterStoryBody[a] == ' ' || model.ReporterStoryBody[a] == '\n' || model.ReporterStoryBody[a] == '\t')
                        {
                            myWord++;
                        }
                        a++;
                    }
                    newobj.ReporterStoryWord = myWord;
                    newobj.SyncStatus = 1;
                    newobj.UpdateDate = DateTime.Now;

                    db.ReporterStories.Add(newobj);
                    db.SaveChanges();
                    model.ReporterStoryId = newobj.ReporterStoryId;
                    model.ReporterStoryHeading = newobj.ReporterStoryHeading;

                    response.Result = model;
                    response.IsSuccess = true;
                    response.Message = $"Success, Reporter Story Submited";
                }
                else
                {

                    if (tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, Please Enter more than one tag with comma";
                    }
                    if (CountReporterheader > 0)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today";
                    }
                    if (CountReporterheader > 0 && tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today,Please Enter more than one tag with comma";
                    }

                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = $"Error, {ex.Message}";
              
            }         

            return response;
        }

        public GlobalResponse<ReporterStoryModel> Edit(ReporterStoryModel model)
        {
            String Date = conversion.DateToStringInSql(DateTime.Parse(model.ReporterStoryDate.ToString()));
            int CountReporterheader = 0;
            clsManager manager = new clsManager();
            DataSet ds = new DataSet();
            ds = manager.ReporterDataset("select Count(*) from ReporterStory where ReporterStoryDate  between '" + Date + "' and '" + Date + "'  and ReporterStoryHeading like N'%" + model.ReporterStoryHeading + "%' and ReporterStoryId!=" + model.ReporterStoryId + "");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                CountReporterheader = int.Parse(dr[0].ToString());
            }
            int tagcount = 0;
            var response = new GlobalResponse<ReporterStoryModel>();
            try
            {

                var item = db.ReporterStories.FirstOrDefault(f => f.ReporterStoryId == model.ReporterStoryId);

                if (item == null)
                {
                    response.Message = $"Warning, Reporter Story not found!";
                    return response;
                }
                string[] tagstring = model.Tag.Split(',').ToArray();
                foreach (string tag in tagstring)
                {
                    tagcount = tagcount + 1;
                }
                if (tagcount > 1 && CountReporterheader == 0)
                {

                    item.ReporterStoryHeading = model.ReporterStoryHeading;
                    item.ReporterStoryBody = model.ReporterStoryBody;
                    item.ReporterStoryWord = model.ReporterStoryWord;
                    item.ReporterStoryDate = model.ReporterStoryDate;
                    item.Tag = model.Tag;
                    item.Status = 1;
                    item.ReporterStoryType = model.ReporterStoryType;
                    //item.ModifiedBy = Convert.ToInt32(HttpContext.Session.GetString("name"));
                    item.UpdateDate = DateTime.Now;
                    int a = 0, myWord = 1;

                    while (a <= model.ReporterStoryBody.Length - 1)
                    {
                        if (model.ReporterStoryBody[a] == ' ' || model.ReporterStoryBody[a] == '\n' || model.ReporterStoryBody[a] == '\t')
                        {
                            myWord++;
                        }
                        a++;
                    }
                    item.ReporterStoryWord = myWord;
                    item.SyncStatus = 1;


                    db.SaveChanges();
                    response.Result = model;
                    response.IsSuccess = true;
                    response.Message = $"Success, Reporter Story information Updated!";
                }
                else
                {

                    if (tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, Please Enter more than one tag with comma";
                    }
                    if (CountReporterheader > 0)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today";
                    }
                    if (CountReporterheader > 0 && tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today,Please Enter more than one tag with comma";
                    }

                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = $"Error, {ex.Message}";
              
            }

           

            return response;
        }
        public GlobalResponse<ReporterStoryModel> EditSubmit(ReporterStoryModel model)
        {
            String Date = conversion.DateToStringInSql(DateTime.Parse(model.ReporterStoryDate.ToString()));
            int CountReporterheader = 0;
            clsManager manager = new clsManager();
            DataSet ds = new DataSet();
            ds = manager.ReporterDataset("select Count(*) from ReporterStory where ReporterStoryDate  between '" + Date + "' and '" + Date + "'  and ReporterStoryHeading like N'%" + model.ReporterStoryHeading + "%' and ReporterStoryId!=" + model.ReporterStoryId + "");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                CountReporterheader = int.Parse(dr[0].ToString());
            }
           
            int tagcount = 0;
            var response = new GlobalResponse<ReporterStoryModel>();
            try
            {

                var item = db.ReporterStories.FirstOrDefault(f => f.ReporterStoryId == model.ReporterStoryId);

                if (item == null)
                {
                    response.Message = $"Warning, Reporter Story not found!";
                    return response;
                }
                string[] tagstring = model.Tag.Split(',').ToArray();
                foreach (string tag in tagstring)
                {
                    tagcount = tagcount + 1;
                }
                if (tagcount > 1 && CountReporterheader == 0)
                {
                    item.ReporterStoryHeading = model.ReporterStoryHeading;
                    item.ReporterStoryBody = model.ReporterStoryBody;
                    item.ReporterStoryWord = model.ReporterStoryWord;


                    item.ReporterStoryDate = model.ReporterStoryDate;
                    item.Tag = model.Tag;
                    item.Status = 2;
                    item.ReporterStoryType = model.ReporterStoryType;
                    //item.ModifiedBy = Convert.ToInt32(HttpContext.Session.GetString("name"));
                    item.UpdateDate = DateTime.Now;
                    item.SyncStatus = 1;

                    int a = 0, myWord = 1;

                    while (a <= model.ReporterStoryBody.Length - 1)
                    {
                        if (model.ReporterStoryBody[a] == ' ' || model.ReporterStoryBody[a] == '\n' || model.ReporterStoryBody[a] == '\t')
                        {
                            myWord++;
                        }
                        a++;
                    }
                    item.ReporterStoryWord = myWord;

                    db.SaveChanges();
                    response.Result = model;
                    response.IsSuccess = true;
                    response.Message = $"Success, Reporter Story information Updated!";
                }
                else
                {


                    if (tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, Please Enter more than one tag with comma";
                    }
                    if (CountReporterheader > 0)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today";
                    }
                    if (CountReporterheader > 0 && tagcount < 2)
                    {

                        response.IsSuccess = false;
                        response.Message = $"Warning, This heading already saved today,Please Enter more than one tag with comma";
                    }

                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = $"Error, {ex.Message}";
               
            }

           

            return response;
        }


        public ReporterStoryModel GetReporterStoryById(int id)
        {
            var singleObj = new ReporterStoryModel();

            try
            {
                var query = $@"select * from ReporterStory where ReporterStoryId=" + id + " ";

                var queryresult = db.ReporterStories.FromSqlRaw(query).AsParallel().Single();

                singleObj = MapperExtra.MapEntity<ReporterStoryModel, ReporterStory>(queryresult);

            }
            catch (Exception ex)
            {
                singleObj = new ReporterStoryModel();

            }

            return singleObj;
        }

        public GlobalResponse<ReporterStoryModel> Delete(int id)
        {
            var response = new GlobalResponse<ReporterStoryModel>();
            try
            {
                var ItemDelete = db.ReporterStories.FirstOrDefault(f => f.ReporterStoryId == id);

                if (ItemDelete == null)
                {
                    response.Message = $"Warning, Reporter Story not found!";
                    return response;
                }

                db.ReporterStories.Remove(ItemDelete);

                db.SaveChanges();
                response.IsSuccess = true;
                response.Message = $"Success,Reporter Story record deleted!";
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = $"Error, {ex.Message}";
             
            }          

            return response;
        }

    }
}
