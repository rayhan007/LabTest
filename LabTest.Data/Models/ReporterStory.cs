using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabTest.Data.Models
{
    [Table("ReporterStory")]
    public class ReporterStory
    {
        [Key]
        public int ReporterStoryId { get; set; }
        public string ReporterStoryHeading { get; set; }
        public string ReporterStoryBody { get; set; }
        public int? ReporterStoryWord { get; set; }
        public int? EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? Status { get; set; }
        public DateTime? ReporterStoryDate { get; set; }
        public string Tag { get; set; }
        public string ReporterStoryType { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string SentFrom { get; set; }
        public int? DeskId { get; set; }
        public int? DistrictId { get; set; }
        public int? SyncStatus { get; set; }
    }
}
