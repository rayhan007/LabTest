
namespace LabTest.Service.Utilities
{
    public class GlobalResponse<T> : BaseGlobalResponse
    {
        public T Result { get; set; }
    }
    public class BaseGlobalResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string ActionName { get; set; }
        public int? RulesByPassRestrict { get; set; }
    }
}
