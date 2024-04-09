using Counter;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var trackers = new List<Tracker>();

app.MapGet("/api/counters", IEnumerable<string> () => trackers.Select(x => x.Name)).WithOpenApi();
app.MapPost("/api/counters", void (CreateTrackerRequest body) =>
{
    if (trackers.Any(x => x.Name == body.Name)) throw new Exception("Counter already exists");
    trackers.Add(new Tracker() { Name = body.Name });
}).WithOpenApi();
app.MapGet("/api/counters/{name:required}", Tracker (string name) => trackers.Single(x => x.Name == name)).WithOpenApi();
app.MapDelete("/api/counters/{name:required}", int (string name) => trackers.RemoveAll(x => x.Name == name)).WithOpenApi();
app.MapPut("/api/counters/{name:required}", void (string name, [FromBody] UpdateTrackerRequest body) => trackers.Single(x => x.Name == name).Value = body.Value).WithOpenApi();

app.Run();