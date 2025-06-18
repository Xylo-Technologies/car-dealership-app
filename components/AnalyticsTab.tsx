"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Users, Eye, MessageSquare } from "lucide-react"
import analyticsData from "@/data/social_media_analytics.json"

// Mock Chart Components (since Chart.js isn't available in this environment)
const LineChart = ({ data, title }: { data: any[]; title: string }) => (
  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
    <div className="text-center">
      <TrendingUp className="mx-auto mb-2 text-gray-400" size={32} />
      <p className="text-gray-600 font-medium">{title}</p>
      <p className="text-sm text-gray-500">Chart.js Line Chart</p>
    </div>
  </div>
)

const BarChart = ({ data, title }: { data: any[]; title: string }) => (
  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
    <div className="text-center">
      <TrendingUp className="mx-auto mb-2 text-gray-400" size={32} />
      <p className="text-gray-600 font-medium">{title}</p>
      <p className="text-sm text-gray-500">Chart.js Bar Chart</p>
    </div>
  </div>
)

const AnalyticsTab = () => {
  const [activeTab, setActiveTab] = useState("tiktok")

  const handleExport = (format: "pdf" | "excel") => {
    // Mock export functionality
    alert(`Exporting analytics data as ${format.toUpperCase()}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-blue">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your social media performance and engagement</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport("pdf")}
            variant="outline"
            className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white"
          >
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button
            onClick={() => handleExport("excel")}
            variant="outline"
            className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white"
          >
            <Download size={16} className="mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Cars</CardTitle>
            <div className="bg-deep-blue/10 p-2 rounded-lg">
              <Users className="h-4 w-4 text-deep-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-deep-blue">{analyticsData.overview.totalCars}</div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
            <div className="bg-gold/10 p-2 rounded-lg">
              <Eye className="h-4 w-4 text-gold" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-deep-blue">
              {analyticsData.overview.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-deep-blue">{analyticsData.overview.totalLeads}</div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-deep-blue">{analyticsData.overview.conversionRate}%</div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="tiktok" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white">
            TikTok Analytics
          </TabsTrigger>
          <TabsTrigger value="instagram" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white">
            Instagram Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tiktok" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue">Follower Growth</CardTitle>
                <CardDescription>TikTok followers over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={analyticsData.tiktok.followers} title="Follower Growth Chart" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue">Engagement Rate</CardTitle>
                <CardDescription>Monthly engagement rate percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={analyticsData.tiktok.engagement} title="Engagement Rate Chart" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Top Performing Posts</CardTitle>
              <CardDescription>Your most successful TikTok content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Post ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Views</th>
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.tiktok.topPosts.map((post, index) => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm">{post.id}</td>
                        <td className="py-3 px-4">{post.title}</td>
                        <td className="py-3 px-4 font-semibold">{post.views.toLocaleString()}</td>
                        <td className="py-3 px-4 font-semibold text-gold">{post.likes.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue">Follower Growth</CardTitle>
                <CardDescription>Instagram followers over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={analyticsData.instagram.followers} title="Follower Growth Chart" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue">Engagement Rate</CardTitle>
                <CardDescription>Monthly engagement rate percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={analyticsData.instagram.engagement} title="Engagement Rate Chart" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Top Performing Posts</CardTitle>
              <CardDescription>Your most successful Instagram content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Post ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Views</th>
                      <th className="text-left py-3 px-4 font-semibold text-deep-blue">Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.instagram.topPosts.map((post, index) => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm">{post.id}</td>
                        <td className="py-3 px-4">{post.title}</td>
                        <td className="py-3 px-4 font-semibold">{post.views.toLocaleString()}</td>
                        <td className="py-3 px-4 font-semibold text-gold">{post.likes.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnalyticsTab
