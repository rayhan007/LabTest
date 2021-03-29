using LabTest.Data.Models;
using LabTest.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace LabTest.Data
{
    public class eSenderContext : DbContext
    {
        public eSenderContext(DbContextOptions<eSenderContext> options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

        }

        #region Tables
       

        public  DbSet<Desk> UserGroups { get; set; }
        public DbSet<ReporterStory> ReporterStories { get; set; }



        #endregion



        #region Views


        public  DbSet<View_UserRole> View_UserRoles { get; set; }
        


        #endregion
    }
}
