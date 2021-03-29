using LabTest.Data.Models;
using LabTest.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace LabTest.Data
{
    public class LabTestContext : DbContext
    {
        public LabTestContext(DbContextOptions<LabTestContext> options)
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
       

        public  DbSet<Building> Buildings { get; set; }
        public DbSet<DataField> DataFields { get; set; }
        public DbSet<MyObject> MyObjects { get; set; }
        public DbSet<Reading> Readings { get; set; }



        #endregion

        #region Views

      
        


        #endregion
    }
}
