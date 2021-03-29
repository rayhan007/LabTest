using System;
using System.Collections.Generic;
using System.Text;

namespace LabTest.Service.Utilities
{
    public class BaseSearchFilter
    {
        public BaseSearchFilter()
        {
            Count = false;
            PageNumber = 1;
        }

        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int Offset { get; set; }
        public bool Count { get; set; }
        public string SearchTerm { get; set; }      
        public int? RoleId { get; set; }
        public int? UserId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
    }
}
