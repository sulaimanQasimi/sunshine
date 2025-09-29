<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('category')->nullable()->after('duration');
            $table->text('tags')->nullable()->after('category');
            $table->text('service_area')->nullable()->after('tags');
            $table->text('requirements')->nullable()->after('service_area');
            $table->text('included')->nullable()->after('requirements');
            $table->text('not_included')->nullable()->after('included');
            $table->string('preparation_time')->nullable()->after('not_included');
            $table->text('cancellation_policy')->nullable()->after('preparation_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'category',
                'tags',
                'service_area',
                'requirements',
                'included',
                'not_included',
                'preparation_time',
                'cancellation_policy'
            ]);
        });
    }
};
