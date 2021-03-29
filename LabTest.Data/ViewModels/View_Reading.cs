using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabTest.Data.ViewModels
{
    [Table("View_Reading")]
    public class View_Reading
    {
        [Key]
        public int BuildingId { get; set; }
        public int DatafieldId { get; set; }
        public int ObjectId { get; set; }
        public string Value { get; set; }
        public DateTime? Timestamp { get; set; }
        
    }
}
