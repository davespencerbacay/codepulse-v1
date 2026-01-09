using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogRepository
    {
        Task<BlogPost> CreateAsync(BlogPost blog);
        Task<IEnumerable<BlogPost>> GetAllAsync();
        Task<BlogPost?> GetByIdAsync(Guid blogId);
        Task<BlogPost?> UpdateAsync(BlogPost blog);
    }
}
