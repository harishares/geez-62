<div class="dashboard-wrapper bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row">
            <!-- Sidebar Navigation -->
            <div class="dashboard-sidebar w-full md:w-64 bg-white rounded-lg shadow-md p-4 mb-6 md:mb-0 md:mr-6">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                
                <nav class="dashboard-nav">
                    <ul>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/dashboard/')); ?>" class="block px-4 py-2 rounded-md bg-purple-100 text-purple-700 font-medium">
                                <span class="mr-2">📊</span> Overview
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/startup-hub/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">💡</span> Startup Hub
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/law-education/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">📚</span> Law Education
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/mentorship/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">👨‍🏫</span> Mentorship
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/networking/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">🔄</span> Networking
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/tasks/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">✅</span> Daily Tasks
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/settings/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">⚙️</span> Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <!-- Main Content -->
            <div class="dashboard-content flex-grow">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                    <!-- Stats Cards -->
                    <?php
                    $stats = array(
                        array('title' => 'Total Activities', 'value' => '42', 'change' => '+8%', 'icon' => '📈'),
                        array('title' => 'Legal Resources', 'value' => '18', 'change' => '+12%', 'icon' => '📚'),
                        array('title' => 'Mentorship Hours', 'value' => '24', 'change' => '+5%', 'icon' => '🕒'),
                        array('title' => 'Network Connections', 'value' => '67', 'change' => '+15%', 'icon' => '🔗'),
                    );
                    
                    foreach ($stats as $stat) :
                    ?>
                        <div class="stat-card bg-white p-6 rounded-lg shadow-md">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-gray-500 text-sm font-medium"><?php echo esc_html($stat['title']); ?></h3>
                                <span class="text-2xl"><?php echo esc_html($stat['icon']); ?></span>
                            </div>
                            <div class="flex items-end justify-between">
                                <p class="text-2xl font-bold"><?php echo esc_html($stat['value']); ?></p>
                                <span class="text-sm font-medium text-green-600"><?php echo esc_html($stat['change']); ?></span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Performance Chart -->
                    <div class="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                        <h2 class="text-lg font-bold mb-4">Your Performance</h2>
                        <div id="performance-chart" class="h-64">
                            <!-- Chart will be rendered here with JavaScript -->
                            <div class="flex items-center justify-center h-full text-gray-500">
                                <p>Loading chart...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Recent Activity -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-lg font-bold mb-4">Recent Activity</h2>
                        <ul class="space-y-3">
                            <?php
                            $activities = array(
                                array('title' => 'Completed Legal Module', 'time' => '2 hours ago', 'icon' => '✅'),
                                array('title' => 'Mentorship Session', 'time' => '1 day ago', 'icon' => '👨‍🏫'),
                                array('title' => 'Joined Networking Event', 'time' => '2 days ago', 'icon' => '🤝'),
                                array('title' => 'Submitted Startup Idea', 'time' => '3 days ago', 'icon' => '💡'),
                            );
                            
                            foreach ($activities as $activity) :
                            ?>
                                <li class="flex items-start">
                                    <span class="mr-2"><?php echo esc_html($activity['icon']); ?></span>
                                    <div>
                                        <p class="font-medium"><?php echo esc_html($activity['title']); ?></p>
                                        <p class="text-sm text-gray-500"><?php echo esc_html($activity['time']); ?></p>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <a href="#" class="block text-center mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium">
                            View All Activity
                        </a>
                    </div>
                </div>
                
                <!-- Goal Progress -->
                <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 class="text-lg font-bold mb-4">Your Goal Progress</h2>
                    <div class="space-y-4">
                        <?php
                        $goals = array(
                            array('title' => 'Complete Legal Basics Course', 'progress' => 75),
                            array('title' => 'Attend 5 Mentorship Sessions', 'progress' => 40),
                            array('title' => 'Submit Business Plan', 'progress' => 90),
                        );
                        
                        foreach ($goals as $goal) :
                        ?>
                            <div class="goal-progress">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-sm font-medium"><?php echo esc_html($goal['title']); ?></span>
                                    <span class="text-sm font-medium"><?php echo esc_html($goal['progress']); ?>%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-purple-600 h-2.5 rounded-full" style="width: <?php echo esc_attr($goal['progress']); ?>%"></div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
